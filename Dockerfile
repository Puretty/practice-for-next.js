# 第1段階: 環境設定および依存関係のインストール
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat

# コマンドを実行するディレクトリを指定
WORKDIR /app

# 依存関係のインストールのために、package.json、yarn.lockをコピー
COPY package.json yarn.lock ./ 

# 依存関係をインストール (新しいlockファイルの変更や作成を防止)
RUN yarn --frozen-lockfile

###########################################################

# 第2段階: next.jsのビルド段階
FROM node:18-alpine AS builder

# Dockerをビルドする際に、開発モードを区別するための環境変数を指定
ARG ENV_MODE 

# コマンドを実行するディレクトリを指定
WORKDIR /app

# 依存関係をコピー
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 環境によって異なるenvファイルを使用するために、環境変数を設定
COPY .env.$ENV_MODE ./.env.$ENV_MODE

# Prisma Clientの生成
RUN npx prisma generate

# Next.jsのビルド
RUN yarn build

###########################################################

# 第3段階: next.js実行段階
FROM node:18-alpine AS runner

# コマンドを実行するディレクトリを指定
WORKDIR /app
 
# コンテナ環境にシステムユーザーを追加
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# standalone構成のためのファイルをコピー
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Prisma ClientとPrismaスキーマをコピー
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

# コンテナの待機ポートを3000に設定
EXPOSE 3000

# nodeでアプリケーションを実行
CMD ["yarn", "start"]
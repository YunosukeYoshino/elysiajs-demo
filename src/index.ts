import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { cors } from '@elysiajs/cors';
import { authRouter } from './routes/auth';
import { postsRouter } from './routes/posts';
import { categoriesRouter } from './routes/categories';

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: 'ElysiaJS CMS API',
          version: '1.0.0',
          description: '軽量CMSのためのRESTful API',
        },
        tags: [
          { name: 'auth', description: '認証関連のエンドポイント' },
          { name: 'posts', description: '投稿管理エンドポイント' },
          { name: 'categories', description: 'カテゴリ管理エンドポイント' },
        ],
      },
    })
  )
  .use(cors())
  .get('/', () => 'ElysiaJS CMS API - お好みのツールでAPIを探索するには /swagger にアクセスしてください')
  .group('/api', (app) => 
    app
      .use(authRouter)
      .use(postsRouter)
      .use(categoriesRouter)
  )
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 ElysiaJS CMS APIサーバー起動中: ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
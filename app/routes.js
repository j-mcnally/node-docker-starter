import ExampleRoutes from './routes/example'

class AppRouter {
  static map(app, Models) {
    ExampleRoutes.map(app, Models);
  }
}

export default AppRouter;

function errorMiddleware(config) {
  return async function(ctx, next) {
    const pathTemplate = config[ctx.status];
    if (pathTemplate) {
      ctx.render(pathTemplate);
    }
    await next();
  }
}

export default errorMiddleware;
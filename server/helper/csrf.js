import CsrfValidation from 'zeass/lib/helper/csrf';

async function failCallback(ctx, next) {
  ctx.json(ctx.CODE.INVALID_CSRF_TOEKN, 'Invalid token');
}

const csrfValidation = new CsrfValidation({ failCallback })
const csrfSetter = csrfValidation.csrfSetter;
const csrfValidator = csrfValidation.csrfValidator;

export {
  csrfSetter,
  csrfValidator
};

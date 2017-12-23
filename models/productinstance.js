
const UUID_REF = "uuid";
const TOKEN_REF = "token";


module.exports = {
  UUID_REF: UUID_REF,
  TOKEN_REF: TOKEN_REF,

  ProductInstance: class {
    constructor(uuid, token) {
      this[UUID_REF] = uuid;
      this[TOKEN_REF] = token;
    }
  },
};
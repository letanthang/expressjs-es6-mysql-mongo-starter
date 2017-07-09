module.exports = {
  redis_prefix: 'api_server',
  private_field: {
    _status: { type: Number, default: 1 },
    _created_by: { type: Number },
    _updated_by: { type: Number },
    _deleted_by: { type: Number }
  }
};

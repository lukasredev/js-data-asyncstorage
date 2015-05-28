describe('dsAsyncStorageAdapter#destroy', function () {
  it('should destroy a user from asyncStorage', function (done) {
    var id;
    dsAsyncStorageAdapter.create(User, { name: 'John' })
      .then(function (user) {
        id = user.id;
        return dsAsyncStorageAdapter.destroy(User, user.id);
      })
      .then(function (user) {
        assert.isFalse(!!user);
        return dsAsyncStorageAdapter.find(User, id);
      })
      .then(function () {
        done('Should not have reached here!');
      })
      .catch(function (err) {
        assert.equal(err.message, 'Not Found!');
        done();
      });
  });
});

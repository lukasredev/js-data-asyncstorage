describe('dsAsyncStorageAdapter#create', function () {
  it('should create a user in asyncStorage', function (done) {
    var id;
    dsAsyncStorageAdapter.create(User, { name: 'John' }).then(function (user) {
      id = user.id;
      assert.equal(user.name, 'John');
      assert.isString(user.id);
      return dsAsyncStorageAdapter.find(User, user.id);
    })
      .then(function (user) {
        assert.equal(user.name, 'John');
        assert.isString(user.id);
        assert.deepEqual(user, { id: id, name: 'John' });
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

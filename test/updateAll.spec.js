describe('dsAsyncStorageAdapter#updateAll', function () {
  it('should update all items', function (done) {
    var id;
    dsAsyncStorageAdapter.create(User, { name: 'John' })
      .then(function (user) {
        id = user.id;
        return dsAsyncStorageAdapter.findAll(User, {
          name: 'John'
        });
      }).then(function (users) {
        assert.equal(users.length, 1);
        assert.deepEqual(users[0], { id: id, name: 'John' });
        return dsAsyncStorageAdapter.updateAll(User, {
          name: 'Johnny'
        }, {
          name: 'John'
        });
      }).then(function (users) {
        assert.equal(users.length, 1);
        assert.deepEqual(users[0], { id: id, name: 'Johnny' });
        return dsAsyncStorageAdapter.findAll(User, {
          name: 'John'
        });
      }).then(function (users) {
        assert.equal(users.length, 0);
        return dsAsyncStorageAdapter.findAll(User, {
          name: 'Johnny'
        });
      }).then(function (users) {
        assert.equal(users.length, 1);
        assert.deepEqual(users[0], { id: id, name: 'Johnny' });
        return dsAsyncStorageAdapter.destroy(User, id);
      }).then(function (destroyedUser) {
        assert.isFalse(!!destroyedUser);
        done();
      }).catch(done);
  });
});

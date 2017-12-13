<template>
  <div class="container">
    <div >
      <h2 class="title">
        Application Users
      </h2>
      <table class="table">
        <thead>
          <tr>
            <th><abbr title="email">Email</abbr></th>
            <th><abbr title="Name">Name</abbr></th>
            <th><abbr title="Roles">Roles</abbr></th>
            <th><abbr title="Comment">Comment</abbr></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user of users" v-bind:key="user.username">
            <td>{{user.username}}</td>
            <td>{{user.name}}</td>
            <td>
              <div v-for="auth of users.authorities" v-bind:key="auth.name">
                  {{auth.name}}&nbsp;
              </div>
            </td>
            <td>{{user.comment}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListUsers',
  data () {
    return {
      users: [
        {
          'username': 'admin@ghip.com',
          'name': 'Administrator',
          'password': '$2a$10$FUycwx2/osoRgLoHpL5UeOZdj85rlOFLbe3/bmlko5yd/SPyrDljS',
          'authorities': [
            {
              'id': 1,
              'name': 'ADMIN'
            }
          ],
          'comment': 'Default Admin user'
        },
        {
          'username': 'user1@ghip.com',
          'name': 'ApplicationUser One',
          'password': '$2a$10$ZA7MWAN07jk7BVqGCJ/Lg.BmOmK.k6SZ9R2Xm6mcRK2jsxDdI1PlK',
          'authorities': [
            {
              'id': 2,
              'name': 'USER'
            }
          ],
          'comment': 'Default non Admin user'
        },
        {
          'username': 'user2@ghip.com',
          'name': 'ApplicationUser Two',
          'password': '$2a$10$cZR7KiVE6iXP/JLiSd7ZfeM04lZlMEgIFrUvXPB/9gYZYbg46yeSW',
          'authorities': [
            {
              'id': 3,
              'name': 'ADMIN'
            },
            {
              'id': 4,
              'name': 'USER'
            }
          ],
          'comment': 'Default ApplicationUser with Admin and ApplicationUser'
        }
      ]
    }
  }
}
</script>

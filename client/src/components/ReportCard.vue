<template>
  <div>
    <AddReport />
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Reported Cases</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="report in reports" :key="report.id">
          <td> {{ report.Country.name }} </td>
          <td> {{ report.cases }} </td>
          <td> <button class="btn btn-danger" @click.prevent="deleteData(report.id)">Delete</button> </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AddReport from '../components/AddReport.vue'
import Swal from 'sweetalert2'
export default {
  created() {
    this.getReport()
  },
  components: {
    AddReport
  },
  computed: mapState(['reports']),
  methods: {
    getReport() {
      this.$store.dispatch('getReport');
    },
    deleteData(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          this.$store.dispatch('deleteData', id);
        }
      })
    }
  }
}
</script>
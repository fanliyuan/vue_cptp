import AddProjectPage from '../../pages/project/addProject.vue'
import EditProjectPage from '../../pages/project/editProject.vue'
import ProjectListPage from '../../pages/project/projectList.vue'
import ProjectSearchResultPage from '../../pages/project/projectSearchResult.vue'
export default [
  {
    path: '/project',
    name: 'project',
    component: ProjectListPage
  },
  {
    path: 'addProject',
    name: 'addProject',
    component: AddProjectPage
  },
  {
    path: 'editProject',
    name: 'editProject',
    component: EditProjectPage
  },
  {
    path: 'projectSearchResult',
    name: 'projectSearchResult',
    component: ProjectSearchResultPage
  }
]

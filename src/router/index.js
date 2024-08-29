import Vue from "vue";
import VueRouter from "vue-router";
import LoginInterface from "src/components/LoginComponents/LoginInterface.vue";
import CellInformation from "src/components/HomePageComponents/Main/PropertyManagementMain/CellInformation.vue";
import HomePage from "src/components/HomePageComponents/Main/HomePageMain/HomePage.vue";
import PropertyInforMation from "src/components/HomePageComponents/Main/PropertyManagementMain/PropertyInforMation.vue";
import PropertyManagement from "src/components/HomePageComponents/Main/ParentMain.vue";
import PositionManagement from "src/components/HomePageComponents/Main/PropertyManagementMain/PositionManagement.vue";
import StaffManagement from "src/components/HomePageComponents/Main/PropertyManagementMain/StaffManagement.vue";
import ParkingRecord from "src/components/HomePageComponents/Main/ParkManagementMain/ParkingRecord.vue";
import ParkManagement from "src/components/HomePageComponents/Main/ParkManagementMain/ParkManagement.vue";
import StallManagement from "src/components/HomePageComponents/Main/ParkManagementMain/StallManagement.vue";
import CarManagement from "src/components/HomePageComponents/Main/ParkManagementMain/CarManagement.vue";
import VehiclesPresent from "src/components/HomePageComponents/Main/ParkManagementMain/VehiclesPresent.vue";
import HouseManagement from "src/components/HomePageComponents/Main/NeighbourhoodMain/HouseManagement.vue";
import PropertyRegistration from "src/components/HomePageComponents/Main/NeighbourhoodMain/PropertyRegistration.vue";
import CommunityStructure from "src/components/HomePageComponents/Main/NeighbourhoodMain/CommunityStructure.vue";
import NeighbourhoodPublicity from "src/components/HomePageComponents/Main/NeighbourhoodMain/NeighbourhoodPublicity.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component:LoginInterface
    },
    {
        path: '/home',
        component: HomePage
    },
    {
        path: '/property',
        component:PropertyManagement,
        children:[
            {
                path:'1',
                component:PropertyInforMation
            },
            {
                path: '2',
                component: CellInformation
            },
            {
                path: '3',
                component: PositionManagement
            },
            {
                path: '4',
                component: StaffManagement
            }
        ]
    },
    {
        path: '/park',
        component:PropertyManagement,
        children:[
            {
                path:'management',
                component:ParkManagement
            },
            {
                path: 'stall',
                component: StallManagement
            },
            {
                path: 'car',
                component: CarManagement
            },
            {
                path: 'present',
                component: VehiclesPresent
            },
            {
                path: 'record',
                component: ParkingRecord
            }
        ]
    },
    {
        path: '/neighbourhood',
        component:PropertyManagement,
        children:[
            {
                path:'houses',
                component:HouseManagement
            },
            {
                path: 'register',
                component: PropertyRegistration
            },
            {
                path: 'structure',
                component: CommunityStructure
            },
            {
                path: 'publicity',
                component: NeighbourhoodPublicity
            },
        ]
    },

]
const router = new VueRouter({
    // 这里配置的是路由和组件的映射关系, 是一个数组.
    routes,
    mode: "history"
})


export default router



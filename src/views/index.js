import LoginView from './auth/LoginView.vue'
import RegisterView from './auth/RegisterView.vue'
import DashboardView from './admin/DashboardView.vue'
import ProfileResponsibleView from './auth/ProfileResponsibleView.vue'
import HomeView from './global/HomeView.vue'
import ProfileDriverView from './auth/ProfileDriverView.vue'
import TestView from './tests/TestView.vue'
import DriverAdminView from './admin/drivers/DriversAdminView.vue'
import VehiclesAdminView from './admin/vehicles/VehiclesAdminView.vue'
import VehicleAdminRetrieveView from './admin/vehicles/VehicleAdminRetrieveView.vue'
import DriverAdminRetrieveView from './admin/drivers/DriverAdminRetrieveView.vue'
import WebSocketView from './tests/WebSocketView.vue'
import DriverAdminTrackByIdView from './admin/drivers/DriverAdminTrackByIdView.vue'
import PassengersAdminView from './admin/passengers/PassengersAdminView.vue'
import ResponsiblesAdminView from './admin/responsibles/ResponsiblesAdminView.vue'
import DriverAdminTrackView from './admin/drivers/DriverAdminTrackView.vue'
class Views {
  static HomeView = HomeView
  static LoginView = LoginView
  static RegisterView = RegisterView
  static DashboardView = DashboardView
  static ProfileResponsibleView = ProfileResponsibleView
  static ProfileDriverView = ProfileDriverView
  static TestView = TestView
  static DriverAdminView = DriverAdminView
  static VehiclesAdminView = VehiclesAdminView
  static VehicleAdminRetrieveView = VehicleAdminRetrieveView
  static DriverAdminRetrieveView = DriverAdminRetrieveView
  static WebSocketView = WebSocketView
  static DriverAdminTrackByIdView = DriverAdminTrackByIdView
  static PassengersAdminView = PassengersAdminView
  static ResponsiblesAdminView = ResponsiblesAdminView
  static DriverAdminTrackView = DriverAdminTrackView
}

export { Views }

import LoginView from './auth/LoginView.vue';
import RegisterView from './auth/RegisterView.vue';
import DashboardView from './admin/DashboardView.vue';
import ProfileResponsibleView from './auth/ProfileResponsibleView.vue';
import HomeView from './global/HomeView.vue';
import ProfileDriverView from './auth/ProfileDriverView.vue';
import TestView from './tests/TestView.vue';
import DriverAdminView from './admin/drivers/DriversAdminView.vue';
import VehiclesAdminView from './admin/vehicles/VehiclesAdminView.vue';
import VehicleAdminRetrieveView from './admin/vehicles/VehicleAdminRetrieveView.vue';
import DriverAdminRetrieveView from './admin/drivers/DriverAdminRetrieveView.vue';

class Views {
  static HomeView = HomeView;
  static LoginView = LoginView;
  static RegisterView = RegisterView;
  static DashboardView = DashboardView;
  static ProfileResponsibleView = ProfileResponsibleView;
  static ProfileDriverView = ProfileDriverView;
  static TestView = TestView;
  static DriverAdminView = DriverAdminView;
  static VehiclesAdminView = VehiclesAdminView;
  static VehicleAdminRetrieveView = VehicleAdminRetrieveView;
  static DriverAdminRetrieveView = DriverAdminRetrieveView;
}

export { Views };

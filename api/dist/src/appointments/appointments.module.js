"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsModule = void 0;
const common_1 = require("@nestjs/common");
const appointments_service_1 = require("./services/appointments.service");
const appointments_controller_1 = require("./appointments.controller");
const sequelize_1 = require("@nestjs/sequelize");
const minor_model_1 = require("../clients/models/minor.model");
const shared_module_1 = require("../shared/shared.module");
const test_result_model_1 = require("../test-result/entities/test-result.model");
const consecutive_model_1 = require("./entities/consecutive.model");
const result_release_service_1 = require("./result-release/result-release.service");
const configuration_module_1 = require("../configuration/configuration.module");
const appointment_availability_model_1 = require("./entities/appointment-availability.model");
const billing_data_model_1 = require("./entities/billing-data.model");
const test_type_model_1 = require("./entities/test-type.model");
const appointment_availability_service_1 = require("./services/appointment-availability.service");
const test_type_controller_1 = require("./test-type.controller");
const appointment_availability_controller_1 = require("./appointment-availability.controller");
const test_types_service_1 = require("./services/test-types.service");
const appointment_model_1 = require("./entities/appointment.model");
const appointment_creation_service_1 = require("./services/appointment-creation.service");
const appointment_creation_validation_service_1 = require("./services/appointment-creation-validation.service");
const clients_module_1 = require("../clients/clients.module");
const assistance_controller_1 = require("./assistance/assistance.controller");
const assistance_service_1 = require("./assistance/assistance.service");
const payment_model_1 = require("./entities/payment.model");
const appointment_payment_controller_1 = require("./appointment-payment.controller");
const appointment_proof_of_payment_service_1 = require("./services/appointment-proof-of-payment.service");
const file_model_1 = require("./entities/file.model");
const appointment_cancellation_service_1 = require("./services/appointment-cancellation.service");
const users_module_1 = require("../users/users.module");
const appointment_reschedule_service_1 = require("./services/appointment-reschedule.service");
const appointment_payment_information_service_1 = require("./services/appointment-payment-information.service");
const appointment_proof_of_payment_image_controller_1 = require("./appointment-proof-of-payment-image.controller");
const jwt_1 = require("@nestjs/jwt");
const bootstrap_config_service_1 = require("../utils/bootstrap-config-service");
const appointment_proof_of_payment_validation_controller_1 = require("./appointment-proof-of-payment-validation.controller");
const payments_controller_1 = require("./payments/payments.controller");
const payments_service_1 = require("./payments/payments-service");
const result_inquiry_controller_1 = require("./result-inquiry/result-inquiry.controller");
const result_inquiry_service_1 = require("./result-inquiry/result-inquiry.service");
const appointment_files_controller_1 = require("./appointment-files/appointment-files.controller");
let AppointmentsModule = class AppointmentsModule {
};
AppointmentsModule = __decorate([
    common_1.Module({
        imports: [
            sequelize_1.SequelizeModule.forFeature([
                appointment_model_1.Appointment,
                consecutive_model_1.Consecutive,
                test_result_model_1.TestResult,
                minor_model_1.Minor,
                appointment_availability_model_1.AppointmentAvailability,
                billing_data_model_1.BillingData,
                test_type_model_1.TestType,
                payment_model_1.Payment,
                file_model_1.ProofOfPayment,
            ]),
            shared_module_1.SharedModule,
            configuration_module_1.ConfigurationModule,
            clients_module_1.ClientsModule,
            users_module_1.UsersModule,
            common_1.forwardRef(() => jwt_1.JwtModule.register({
                secret: bootstrap_config_service_1.appConfig.get('JWT_KEY'),
            })),
        ],
        controllers: [
            appointments_controller_1.AppointmentsController,
            test_type_controller_1.TestTypeController,
            appointment_availability_controller_1.AppointmentAvailabilityController,
            assistance_controller_1.AssistanceController,
            appointment_payment_controller_1.AppointmentPaymentController,
            appointment_proof_of_payment_image_controller_1.AppointmentProofOfPaymentImageController,
            appointment_proof_of_payment_validation_controller_1.AppointmentProofOfPaymentValidationController,
            payments_controller_1.PaymentsController,
            result_inquiry_controller_1.ResultInquiryController,
            appointment_files_controller_1.AppointmentFilesController,
        ],
        providers: [
            appointments_service_1.AppointmentsService,
            result_release_service_1.ResultReleaseService,
            test_types_service_1.TestTypesService,
            appointment_availability_service_1.AppointmentAvailabilityService,
            appointment_creation_service_1.AppointmentCreationService,
            appointment_creation_validation_service_1.AppointmentCreationValidationService,
            assistance_service_1.AssistanceService,
            appointment_proof_of_payment_service_1.AppointmentProofOfPaymentService,
            appointment_cancellation_service_1.AppointmentCancelationService,
            appointment_reschedule_service_1.AppointmentRescheduleService,
            appointment_payment_information_service_1.AppointmentPaymentInformationService,
            payments_service_1.PaymentsService,
            result_inquiry_service_1.ResultInquiryService,
        ],
        exports: [appointments_service_1.AppointmentsService, assistance_service_1.AssistanceService],
    })
], AppointmentsModule);
exports.AppointmentsModule = AppointmentsModule;
//# sourceMappingURL=appointments.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestResultService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const lodash_1 = require("lodash");
const sequelize_typescript_1 = require("sequelize-typescript");
const appointment_states_1 = require("../appointments/constants/appointment-states");
const appointment_model_1 = require("../appointments/entities/appointment.model");
const test_type_model_1 = require("../appointments/entities/test-type.model");
const appointments_service_1 = require("../appointments/services/appointments.service");
const base_service_1 = require("../shared/base/base.service");
const querist_1 = require("../shared/querying/querist");
const create_test_result_dto_1 = require("./dto/create-test-result.dto");
const test_result_model_1 = require("./entities/test-result.model");
let TestResultService = class TestResultService extends base_service_1.BaseService {
    constructor(testResultModel, querist, sequelizeInstance, appointmentModel, appointmentService) {
        super(testResultModel, querist);
        this.sequelizeInstance = sequelizeInstance;
        this.appointmentModel = appointmentModel;
        this.appointmentService = appointmentService;
    }
    bulkRegisterResults(createTestResultDto) {
        return this.sequelizeInstance.transaction(async (transaction) => {
            for (const result of createTestResultDto.results) {
                const appointment = await this.appointmentModel.findOne({
                    where: { code: result.testCode },
                    include: { model: test_type_model_1.TestType },
                    transaction,
                });
                if (!appointment) {
                    throw new common_1.BadRequestException(`test with code ${result.testCode} does not exist`);
                }
                this.validateResultIsInStatePendigResults(appointment.state);
                if (appointment.testType.testTypeCode !== result.resultData.type) {
                    throw new common_1.BadRequestException(`result type does not match appointment test type`);
                }
                const dbResult = await this.set.findOne({
                    where: { discarded: false, testCode: result.testCode },
                    transaction,
                });
                if (dbResult) {
                    if (dbResult.ready) {
                        throw new common_1.BadRequestException(`results marked as ready cannot be modified`);
                    }
                    await dbResult.update(lodash_1.pick(result, 'resultData', 'comments'), {
                        transaction,
                    });
                }
                else {
                    await this.set.create(lodash_1.pick(result, 'resultData', 'comments', 'testCode'), {
                        transaction,
                    });
                }
            }
        });
    }
    async getResultValidateItExists(testCode) {
        const dbResult = await this.set.findOne({
            where: { discarded: false, testCode: testCode },
        });
        if (!dbResult) {
            throw new common_1.NotFoundException(`result for test does not exist`);
        }
        return dbResult;
    }
    markAsReady(testCode) {
        return this.sequelizeInstance.transaction(async (transaction) => {
            const dbResult = await this.getResultValidateItExists(testCode);
            const validableResult = class_transformer_1.plainToClass(create_test_result_dto_1.ResultDTO, dbResult.toJSON());
            const errors = await class_validator_1.validate(validableResult, { groups: ['ready'] });
            if (!lodash_1.isEmpty(errors)) {
                throw new common_1.BadRequestException('Invalid result');
            }
            const appointment = await this.appointmentService.findOneByCode(testCode);
            this.validateResultIsInStatePendigResults(appointment.state);
            await dbResult.update({ ready: true }, { transaction });
            await appointment.update({ state: appointment_states_1.AppointmentStates.ResultsReady });
        });
    }
    validateResultIsInStatePendigResults(appointmentState) {
        if (appointmentState !== appointment_states_1.AppointmentStates.PendingResults) {
            throw new common_1.BadRequestException(`test result may not be changed for appointment with state '${appointmentState}'`);
        }
    }
    markAsDiscarded(testCode) {
        return this.sequelizeInstance.transaction(async (transaction) => {
            const dbResult = await this.getResultValidateItExists(testCode);
            if (dbResult.ready) {
                throw new common_1.BadRequestException('cannot discard commited results');
            }
            await dbResult.update({ discarded: true }, { transaction });
            await this.appointmentService.assignNewNumber(testCode, transaction);
        });
    }
};
TestResultService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(test_result_model_1.TestResult)),
    __param(2, common_1.Inject('Sequelize')),
    __param(3, sequelize_1.InjectModel(appointment_model_1.Appointment)),
    __metadata("design:paramtypes", [typeof (_a = typeof sequelize_typescript_1.ModelCtor !== "undefined" && sequelize_typescript_1.ModelCtor) === "function" ? _a : Object, querist_1.Querist, typeof (_b = typeof sequelize_typescript_1.Sequelize !== "undefined" && sequelize_typescript_1.Sequelize) === "function" ? _b : Object, typeof (_c = typeof sequelize_typescript_1.ModelCtor !== "undefined" && sequelize_typescript_1.ModelCtor) === "function" ? _c : Object, appointments_service_1.AppointmentsService])
], TestResultService);
exports.TestResultService = TestResultService;
//# sourceMappingURL=test-result.service.js.map
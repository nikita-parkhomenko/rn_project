import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AcceptInviteInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type ChecklistAnswer = {
  answer: Scalars['String'];
  checklistQuestion: ChecklistQuestion;
  checklistQuestionId: Scalars['Float'];
  documentId?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  inspectionId?: Maybe<Scalars['Float']>;
  installationId?: Maybe<Scalars['Float']>;
  photoKey?: Maybe<Scalars['String']>;
  photos?: Maybe<Array<Document>>;
};

export type ChecklistAnswerDocument = {
  photoKey: Scalars['String'];
};

export type ChecklistAnswerInput = {
  answer: Scalars['String'];
  photos?: Maybe<Array<ChecklistAnswerPhotoInput>>;
  questionId: Scalars['ID'];
};

export type ChecklistAnswerPhotoInput = {
  file: Scalars['Upload'];
  photoKey?: Maybe<Scalars['String']>;
};

export type ChecklistAnswerWithDocument = {
  answer: Scalars['String'];
  checklistQuestion: ChecklistQuestion;
  documents?: Maybe<Array<DocumentWithPhotoKey>>;
  installationId: Scalars['Float'];
};

export type ChecklistQuestion = {
  code: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Company = {
  admin: User;
  billingAddressOne?: Maybe<Scalars['String']>;
  billingAddressTwo?: Maybe<Scalars['String']>;
  billingCity?: Maybe<Scalars['String']>;
  billingEmail?: Maybe<Scalars['String']>;
  billingPostcode?: Maybe<Scalars['String']>;
  contactPhone?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  passedReportsForCurrentMonth: Scalars['Int'];
  sites: Array<Site>;
  status: Status;
  types: Array<CompanyType>;
};

export type CompanyHeader = {
  billingEmail?: Maybe<Scalars['String']>;
  companyTypes: Array<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  passedReports: Scalars['Int'];
  status: Scalars['String'];
};

export type CompanySite = {
  company: Company;
  site: Site;
};

export type CompanyType = {
  code: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
};

export enum CompanyTypes {
  FacilityManagement = 'FacilityManagement',
  Inspection = 'Inspection',
  Installer = 'Installer',
  Manufacturer = 'Manufacturer',
  Service = 'Service'
}


export type Document = {
  description?: Maybe<Scalars['String']>;
  documentType: DocumentType;
  id: Scalars['ID'];
  originalFilename: Scalars['String'];
};

export type DocumentInput = {
  documentTypeCode: Scalars['String'];
  file: Scalars['Upload'];
  id?: Maybe<Scalars['ID']>;
};

export type DocumentType = {
  code: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type DocumentWithPhotoKey = {
  documentId: Scalars['Float'];
  photoKey?: Maybe<Scalars['String']>;
};

export type Door = {
  addedBy?: Maybe<User>;
  assignment?: Maybe<DoorAssignment>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  documents?: Maybe<Array<Document>>;
  doorParts?: Maybe<DoorParts>;
  doorReference?: Maybe<Scalars['String']>;
  fdRating?: Maybe<FdRating>;
  fireCertificateComplete: Scalars['Boolean'];
  history?: Maybe<Array<DoorHistory>>;
  id: Scalars['ID'];
  inspectionFrequency?: Maybe<Scalars['Int']>;
  inspector?: Maybe<Company>;
  installationGuideComplete: Scalars['Boolean'];
  installer?: Maybe<Company>;
  lastestInstallationInstalledBy?: Maybe<Scalars['String']>;
  latestInstallationDate?: Maybe<Scalars['DateTime']>;
  leaf1AccousticRating?: Maybe<Scalars['String']>;
  leaf1CoreSupplier?: Maybe<Scalars['String']>;
  leaf1Height?: Maybe<Scalars['String']>;
  leaf1Width?: Maybe<Scalars['String']>;
  leaf2AccousticRating?: Maybe<Scalars['String']>;
  leaf2CoreSupplier?: Maybe<Scalars['String']>;
  leaf2Height?: Maybe<Scalars['String']>;
  leaf2Width?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  manufacturedBy?: Maybe<Company>;
  model?: Maybe<DoorModel>;
  nextInspectionDate?: Maybe<Scalars['DateTime']>;
  partsListComplete: Scalars['Boolean'];
  projectReference?: Maybe<Scalars['String']>;
  readOnly: Scalars['Boolean'];
  site?: Maybe<Site>;
  status: Status;
  tagId?: Maybe<Scalars['String']>;
  transferredToFacilityManagementAt?: Maybe<Scalars['DateTime']>;
  transferredToInstallerAt?: Maybe<Scalars['DateTime']>;
  warrantyComplete: Scalars['Boolean'];
};

export type DoorAssignment = {
  assignedBy: User;
  contractorCompany: Company;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  status: Status;
  workType: WorkType;
};

export enum DoorFilterStages {
  All = 'All',
  Failed = 'Failed',
  Incomplete = 'Incomplete',
  Ready = 'Ready',
  Transferred = 'Transferred'
}

export type DoorHistory = {
  addedBy: User;
  addedByCompanyName: Scalars['String'];
  addedByName: Scalars['String'];
  additionalInfoJson?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  historyEventType: HistoryEventType;
  id: Scalars['ID'];
};

export type DoorInput = {
  additionalComments?: Maybe<Scalars['String']>;
  chain?: Maybe<Scalars['String']>;
  closer?: Maybe<Scalars['String']>;
  cylinder?: Maybe<Scalars['String']>;
  documents?: Maybe<Array<DocumentInput>>;
  doorLeafs?: Maybe<Array<DoorLeafInput>>;
  doorModelId?: Maybe<Scalars['ID']>;
  doorReference?: Maybe<Scalars['String']>;
  dropSeal?: Maybe<Scalars['String']>;
  fdRatingId?: Maybe<Scalars['Float']>;
  handles?: Maybe<Scalars['String']>;
  hinges?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  inspectionFrequency?: Maybe<Scalars['Int']>;
  intumescentStrip?: Maybe<Scalars['String']>;
  keeps?: Maybe<Scalars['String']>;
  letterbox?: Maybe<Scalars['String']>;
  lockLatch?: Maybe<Scalars['String']>;
  numerals?: Maybe<Scalars['String']>;
  photos?: Maybe<Array<DoorPhotoInput>>;
  projectReference?: Maybe<Scalars['String']>;
  smokeSeals?: Maybe<Scalars['String']>;
  spyhole?: Maybe<Scalars['String']>;
  tagId?: Maybe<Scalars['String']>;
  thresholdStrip?: Maybe<Scalars['String']>;
  weatherSeals?: Maybe<Scalars['String']>;
};

export type DoorLeafInput = {
  acousticRating?: Maybe<Scalars['String']>;
  coreSupplier?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type DoorModel = {
  addedBy?: Maybe<User>;
  addedByCompany: Company;
  coreSupplier?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  documents?: Maybe<Array<Document>>;
  doorModelParts?: Maybe<DoorModelParts>;
  fdRating?: Maybe<FdRating>;
  fireCertificateComplete: Scalars['Boolean'];
  id: Scalars['ID'];
  installationGuideComplete: Scalars['Boolean'];
  name: Scalars['String'];
  partsListComplete: Scalars['Boolean'];
  warrantyComplete: Scalars['Boolean'];
};

export type DoorModelDocumentsInput = {
  documents?: Maybe<Array<DocumentInput>>;
  doorModelId?: Maybe<Scalars['ID']>;
};

export type DoorModelInput = {
  additionalComments?: Maybe<Scalars['String']>;
  closer?: Maybe<Scalars['String']>;
  coreSupplier?: Maybe<Scalars['String']>;
  cylinder?: Maybe<Scalars['String']>;
  documents?: Maybe<Array<DocumentInput>>;
  dropSeal?: Maybe<Scalars['String']>;
  fdRatingId?: Maybe<Scalars['Float']>;
  handles?: Maybe<Scalars['String']>;
  hinges?: Maybe<Scalars['String']>;
  intumescentStrip?: Maybe<Scalars['String']>;
  letterbox?: Maybe<Scalars['String']>;
  lockLatch?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  smokeSeals?: Maybe<Scalars['String']>;
  spyhole?: Maybe<Scalars['String']>;
  thresholdStrip?: Maybe<Scalars['String']>;
};

export type DoorModelParts = {
  additionalComments?: Maybe<Scalars['String']>;
  closer?: Maybe<Scalars['String']>;
  cylinder?: Maybe<Scalars['String']>;
  doorModel: DoorModel;
  dropSeal?: Maybe<Scalars['String']>;
  handles?: Maybe<Scalars['String']>;
  hinges?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  intumescentStrip?: Maybe<Scalars['String']>;
  letterbox?: Maybe<Scalars['String']>;
  lockLatch?: Maybe<Scalars['String']>;
  smokeSeals?: Maybe<Scalars['String']>;
  spyhole?: Maybe<Scalars['String']>;
  thresholdStrip?: Maybe<Scalars['String']>;
};

export type DoorParts = {
  additionalComments?: Maybe<Scalars['String']>;
  chain?: Maybe<Scalars['String']>;
  closer?: Maybe<Scalars['String']>;
  cylinder?: Maybe<Scalars['String']>;
  door: Door;
  dropSeal?: Maybe<Scalars['String']>;
  handles?: Maybe<Scalars['String']>;
  hinges?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  intumescentStrip?: Maybe<Scalars['String']>;
  keeps?: Maybe<Scalars['String']>;
  letterbox?: Maybe<Scalars['String']>;
  lockLatch?: Maybe<Scalars['String']>;
  numerals?: Maybe<Scalars['String']>;
  smokeSeals?: Maybe<Scalars['String']>;
  spyhole?: Maybe<Scalars['String']>;
  thresholdStrip?: Maybe<Scalars['String']>;
  weatherSeals?: Maybe<Scalars['String']>;
};

export type DoorPhotoInput = {
  description?: Maybe<Scalars['String']>;
  file: Scalars['Upload'];
  id?: Maybe<Scalars['ID']>;
};

export type DoorRepairing = {
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  reason: Scalars['String'];
};

export type DoorRetirement = {
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  reason: Scalars['String'];
};

export type FailureRisk = {
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type FdRating = {
  id: Scalars['Float'];
  value: Scalars['Float'];
};

export type FireStoppingType = {
  code: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type HistoryEventType = {
  code: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type IdListInput = {
  ids: Array<Scalars['Float']>;
};

export type InspectDoorInput = {
  answers: Array<ChecklistAnswerInput>;
  doorId: Scalars['ID'];
};

export type Inspection = {
  completedDate: Scalars['DateTime'];
  id: Scalars['ID'];
  isSignedOff?: Maybe<Scalars['Boolean']>;
};

export type Installation = {
  completedDate: Scalars['DateTime'];
  id: Scalars['ID'];
  isSignedOff?: Maybe<Scalars['Boolean']>;
};

export type InstallDoorInput = {
  answers: Array<ChecklistAnswerInput>;
  doorId: Scalars['ID'];
  location?: Maybe<Scalars['String']>;
  siteId: Scalars['ID'];
};

export type Mutation = {
  acceptInvite: Array<Role>;
  addDoor: Door;
  addSite: Scalars['Boolean'];
  addToMySites: Scalars['Boolean'];
  addUser: User;
  assignDoorsToContractor: Scalars['Boolean'];
  assignDoorTag: Door;
  cancelInspections: Scalars['Boolean'];
  cancelInstallations: Scalars['Boolean'];
  deleteDoorModels: Scalars['Boolean'];
  disableDoors: Scalars['Boolean'];
  disableUsers: Scalars['Boolean'];
  editCompany: Company;
  editSite: Site;
  enableUsers: Scalars['Boolean'];
  inspectDoor: Scalars['Boolean'];
  installDoor: Scalars['Boolean'];
  inviteCompany: Company;
  passwordResetRequest: Scalars['Boolean'];
  recordDoorNotAccessible: Scalars['Boolean'];
  removeFromMySites: Scalars['Boolean'];
  repairDoor: Scalars['Boolean'];
  requestAccount: Scalars['Boolean'];
  resetPassword: Array<Role>;
  retireDoors: Scalars['Boolean'];
  saveDoorModel: Scalars['Boolean'];
  saveDoorModelDocuments: DoorModel;
  signOffInspection: Scalars['Boolean'];
  signOffInstallation: Scalars['Boolean'];
  startInspection: Scalars['Boolean'];
  startInstallation: Scalars['Boolean'];
  transferDoors: Scalars['Boolean'];
  uploadDoorsFile: Scalars['Boolean'];
};


export type MutationAcceptInviteArgs = {
  acceptInviteInput: AcceptInviteInput;
};


export type MutationAddDoorArgs = {
  door: DoorInput;
};


export type MutationAddSiteArgs = {
  siteInput: SiteInput;
};


export type MutationAddToMySitesArgs = {
  idListInput: IdListInput;
};


export type MutationAddUserArgs = {
  newUserInput: NewUserInput;
};


export type MutationAssignDoorsToContractorArgs = {
  destinationCompanyId: Scalars['ID'];
  destinationUserId: Scalars['ID'];
  ids: Array<Scalars['Float']>;
  workTypeId: Scalars['ID'];
};


export type MutationAssignDoorTagArgs = {
  id: Scalars['ID'];
  tag: Scalars['String'];
};


export type MutationCancelInspectionsArgs = {
  idListInput: IdListInput;
};


export type MutationCancelInstallationsArgs = {
  idListInput: IdListInput;
};


export type MutationDeleteDoorModelsArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationDisableDoorsArgs = {
  idListInput: IdListInput;
};


export type MutationDisableUsersArgs = {
  idListInput: IdListInput;
};


export type MutationEditCompanyArgs = {
  companyInput: NewCompanyInput;
};


export type MutationEditSiteArgs = {
  siteInput: SiteInput;
};


export type MutationEnableUsersArgs = {
  idListInput: IdListInput;
};


export type MutationInspectDoorArgs = {
  checklist: InspectDoorInput;
};


export type MutationInstallDoorArgs = {
  checklist: InstallDoorInput;
};


export type MutationInviteCompanyArgs = {
  companyInput: NewCompanyInput;
};


export type MutationPasswordResetRequestArgs = {
  userEmail: Scalars['String'];
};


export type MutationRecordDoorNotAccessibleArgs = {
  details: RecordDoorNotAccessibleInput;
};


export type MutationRemoveFromMySitesArgs = {
  idListInput: IdListInput;
};


export type MutationRepairDoorArgs = {
  repairDoorInput: RepairDoorInput;
};


export type MutationRequestAccountArgs = {
  requestAccountInput: RequestAccountInput;
};


export type MutationResetPasswordArgs = {
  resetPasswordInput: ResetPasswordInput;
};


export type MutationRetireDoorsArgs = {
  retireDoorInput: RetireDoorInput;
};


export type MutationSaveDoorModelArgs = {
  doorModelInput: DoorModelInput;
};


export type MutationSaveDoorModelDocumentsArgs = {
  doorModelDocumentsInput: DoorModelDocumentsInput;
};


export type MutationSignOffInspectionArgs = {
  doorId: Scalars['ID'];
  failureRiskId?: Maybe<Scalars['ID']>;
  isSuccess: Scalars['Boolean'];
  message: Scalars['String'];
};


export type MutationSignOffInstallationArgs = {
  doorId: Scalars['ID'];
  isSuccess: Scalars['Boolean'];
  message: Scalars['String'];
};


export type MutationStartInspectionArgs = {
  doorId: Scalars['ID'];
};


export type MutationStartInstallationArgs = {
  doorId: Scalars['ID'];
  location: Scalars['String'];
  siteId: Scalars['ID'];
};


export type MutationTransferDoorsArgs = {
  destinationCompanyId: Scalars['ID'];
  destinationUserId: Scalars['ID'];
  ids: Array<Scalars['Float']>;
  orderRef: Scalars['String'];
  transferType: TransferTypes;
};


export type MutationUploadDoorsFileArgs = {
  file: Scalars['Upload'];
};

export type NewCompanyInput = {
  adminEmail: Scalars['String'];
  adminName: Scalars['String'];
  billingAddressLine1: Scalars['String'];
  billingAddressLine2: Scalars['String'];
  billingCity: Scalars['String'];
  billingEmail: Scalars['String'];
  billingPostcode: Scalars['String'];
  companyName: Scalars['String'];
  contactPhone: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  typeIds: Array<Scalars['Float']>;
};

export type NewUserInput = {
  companyId: Scalars['Float'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  roleIds: Array<Scalars['Float']>;
};

export type PaginatedCompanyResponse = {
  hasMore: Scalars['Boolean'];
  items: Array<CompanyHeader>;
  total: Scalars['Int'];
};

export type PaginatedDoorModelResponse = {
  hasMore: Scalars['Boolean'];
  items: Array<DoorModel>;
  total: Scalars['Int'];
};

export type PaginatedDoorResponse = {
  hasMore: Scalars['Boolean'];
  items: Array<Door>;
  total: Scalars['Int'];
};

export type PaginatedSiteResponse = {
  hasMore: Scalars['Boolean'];
  items: Array<Site>;
  total: Scalars['Int'];
};

export type PaginatedUserResponse = {
  hasMore: Scalars['Boolean'];
  items: Array<User>;
  total: Scalars['Int'];
};

export type Query = {
  checklistAnswersByInstallationId: Array<ChecklistAnswerWithDocument>;
  checklistQuestions: Array<ChecklistQuestion>;
  companies: PaginatedCompanyResponse;
  companiesByNameAndType: Array<Company>;
  company: Company;
  companyAdminsByName: Array<User>;
  companyTypes: Array<CompanyType>;
  companyUsersByEmail: Array<User>;
  documentTypes: Array<DocumentType>;
  door: Door;
  doorByTagId: Door;
  doorModel: DoorModel;
  doorModels: PaginatedDoorModelResponse;
  doorModelsByName: Array<DoorModel>;
  doors: PaginatedDoorResponse;
  failureRisks: Array<FailureRisk>;
  fdRatings: Array<FdRating>;
  fireStoppingTypes: Array<FireStoppingType>;
  installationsByDoorId: Array<Installation>;
  loggedIn: User;
  mySites: PaginatedSiteResponse;
  roles: Array<Role>;
  rolesByCompany: Array<Role>;
  site: Site;
  sites: PaginatedSiteResponse;
  sitesByName: Array<Site>;
  user: User;
  users: PaginatedUserResponse;
  workTypes: Array<WorkType>;
};


export type QueryChecklistAnswersByInstallationIdArgs = {
  installationId: Scalars['Float'];
};


export type QueryChecklistQuestionsArgs = {
  code: Scalars['String'];
};


export type QueryCompaniesArgs = {
  active: Scalars['Boolean'];
  disabled: Scalars['Boolean'];
  reportPeriodFrom?: Maybe<Scalars['DateTime']>;
  reportPeriodTo?: Maybe<Scalars['DateTime']>;
  skip?: Maybe<Scalars['Int']>;
  sortDirection?: Maybe<Scalars['String']>;
  sortField?: Maybe<Scalars['String']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryCompaniesByNameAndTypeArgs = {
  name: Scalars['String'];
  type: Array<CompanyTypes>;
};


export type QueryCompanyArgs = {
  id: Scalars['ID'];
};


export type QueryCompanyAdminsByNameArgs = {
  companyId: Scalars['ID'];
  name: Scalars['String'];
  take: Scalars['Int'];
};


export type QueryCompanyUsersByEmailArgs = {
  companyId: Scalars['ID'];
  email: Scalars['String'];
  includeDeleted?: Maybe<Scalars['Boolean']>;
};


export type QueryDoorArgs = {
  id: Scalars['ID'];
};


export type QueryDoorByTagIdArgs = {
  tagId: Scalars['String'];
};


export type QueryDoorModelArgs = {
  id: Scalars['ID'];
};


export type QueryDoorModelsArgs = {
  skip?: Maybe<Scalars['Int']>;
  sortDirection?: Maybe<Scalars['String']>;
  sortField?: Maybe<Scalars['String']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryDoorModelsByNameArgs = {
  name: Scalars['String'];
};


export type QueryDoorsArgs = {
  active?: Maybe<Scalars['Boolean']>;
  allCompanies?: Maybe<Scalars['Boolean']>;
  doorsTextFilter?: Maybe<Scalars['String']>;
  excludeTransferred?: Maybe<Scalars['Boolean']>;
  inspectionFrom?: Maybe<Scalars['DateTime']>;
  inspectionTo?: Maybe<Scalars['DateTime']>;
  installationFrom?: Maybe<Scalars['DateTime']>;
  installationTo?: Maybe<Scalars['DateTime']>;
  siteId?: Maybe<Scalars['ID']>;
  skip?: Maybe<Scalars['Int']>;
  sortDirection?: Maybe<Scalars['String']>;
  sortField?: Maybe<Scalars['String']>;
  stage?: Maybe<DoorFilterStages>;
  statuses?: Maybe<Array<Scalars['String']>>;
  tagged?: Maybe<Scalars['Boolean']>;
  take?: Maybe<Scalars['Int']>;
  textFilter?: Maybe<Scalars['String']>;
};


export type QueryInstallationsByDoorIdArgs = {
  doorId: Scalars['ID'];
};


export type QueryMySitesArgs = {
  searchTerm?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
  sortDirection?: Maybe<Scalars['String']>;
  sortField?: Maybe<Scalars['String']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryRolesByCompanyArgs = {
  id: Scalars['ID'];
};


export type QuerySiteArgs = {
  id: Scalars['ID'];
};


export type QuerySitesArgs = {
  skip?: Maybe<Scalars['Int']>;
  sortDirection?: Maybe<Scalars['String']>;
  sortField?: Maybe<Scalars['String']>;
  take?: Maybe<Scalars['Int']>;
  textFilter?: Maybe<Scalars['String']>;
};


export type QuerySitesByNameArgs = {
  name: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['Float'];
};


export type QueryUsersArgs = {
  companyId: Scalars['ID'];
  includeDeleted: Scalars['Boolean'];
  skip?: Maybe<Scalars['Int']>;
  sortDirection?: Maybe<Scalars['String']>;
  sortField?: Maybe<Scalars['String']>;
  take?: Maybe<Scalars['Int']>;
};

export type RecordDoorNotAccessibleInput = {
  date: Scalars['DateTime'];
  doorId: Scalars['ID'];
  photos?: Maybe<Array<Scalars['Upload']>>;
  reason: Scalars['String'];
};

export type RepairDoorInput = {
  id: Scalars['Float'];
  photos?: Maybe<Array<Scalars['Upload']>>;
  reason: Scalars['String'];
};

export type RequestAccountInput = {
  adminEmail: Scalars['String'];
  adminName: Scalars['String'];
  companyName: Scalars['String'];
  installerAccreditingOrganisation?: Maybe<Scalars['String']>;
  installerRegistrationNumber?: Maybe<Scalars['String']>;
  typeIds: Array<Scalars['Float']>;
};

export type ResetPasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type RetireDoorInput = {
  ids: Array<Scalars['Float']>;
  isMobileRetirement?: Maybe<Scalars['Boolean']>;
  photos?: Maybe<Array<Scalars['Upload']>>;
  reason: Scalars['String'];
};

export type Role = {
  code: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type Site = {
  addedBy?: Maybe<User>;
  addressOne?: Maybe<Scalars['String']>;
  addressTwo?: Maybe<Scalars['String']>;
  areas?: Maybe<Scalars['Float']>;
  city?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  documents?: Maybe<Array<Document>>;
  id: Scalars['ID'];
  installedDoorCount: Scalars['Float'];
  name: Scalars['String'];
  ownedBy?: Maybe<Company>;
  postcode?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  siteContact?: Maybe<SiteContact>;
};

export type SiteContact = {
  emailAddress?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  mobileNumber?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
};

export type SiteContactInput = {
  emailAddress?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  mobileNumber?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
};

export type SiteDocumentInput = {
  description?: Maybe<Scalars['String']>;
  file: Scalars['Upload'];
  id?: Maybe<Scalars['ID']>;
};

export type SiteInput = {
  addressOne?: Maybe<Scalars['String']>;
  addressTwo?: Maybe<Scalars['String']>;
  areas?: Maybe<Scalars['Float']>;
  city?: Maybe<Scalars['String']>;
  contact?: Maybe<SiteContactInput>;
  drawings?: Maybe<Array<SiteDocumentInput>>;
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  owner?: Maybe<SiteOwnerInput>;
  photos?: Maybe<Array<SiteDocumentInput>>;
  postcode?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
};

export type SiteOwnerInput = {
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
};

export type Status = {
  code: Scalars['String'];
  name: Scalars['String'];
};

export enum TransferTypes {
  InstallerToFacilityManagement = 'InstallerToFacilityManagement',
  ManufacturerToInstaller = 'ManufacturerToInstaller'
}


export type User = {
  addedBy?: Maybe<User>;
  company?: Maybe<Company>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['ID'];
  password: Scalars['String'];
  passwordResetExpiry?: Maybe<Scalars['DateTime']>;
  roles: Array<Role>;
};

export type WorkType = {
  code: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type ChecklistAnswersByInstallationIdQueryVariables = Exact<{
  installationId: Scalars['Float'];
}>;


export type ChecklistAnswersByInstallationIdQuery = { checklistAnswersByInstallationId: Array<(
    Pick<ChecklistAnswerWithDocument, 'answer' | 'installationId'>
    & { checklistQuestion: Pick<ChecklistQuestion, 'id' | 'name' | 'code'>, documents?: Maybe<Array<Pick<DocumentWithPhotoKey, 'documentId' | 'photoKey'>>> }
  )> };

export type ChecklistQuestionsQueryVariables = Exact<{
  code: Scalars['String'];
}>;


export type ChecklistQuestionsQuery = { checklistQuestions: Array<Pick<ChecklistQuestion, 'id' | 'name' | 'code'>> };

export type CompanyQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CompanyQuery = { company: (
    Pick<Company, 'id' | 'name' | 'contactPhone' | 'billingEmail' | 'billingAddressOne' | 'billingAddressTwo' | 'billingCity' | 'billingPostcode' | 'passedReportsForCurrentMonth'>
    & { types: Array<Pick<CompanyType, 'id' | 'code' | 'name'>>, admin: Pick<User, 'fullName' | 'email'> }
  ) };

export type DoorFragment = (
  Pick<Door, 'id' | 'projectReference' | 'doorReference' | 'tagId' | 'leaf1AccousticRating' | 'leaf1CoreSupplier' | 'leaf1Width' | 'leaf1Height' | 'leaf2AccousticRating' | 'leaf2CoreSupplier' | 'leaf2Width' | 'leaf2Height' | 'location'>
  & { fdRating?: Maybe<Pick<FdRating, 'id' | 'value'>>, documents?: Maybe<Array<(
    Pick<Document, 'id' | 'originalFilename' | 'description'>
    & { documentType: Pick<DocumentType, 'id' | 'code' | 'name'> }
  )>>, model?: Maybe<(
    { documents?: Maybe<Array<(
      Pick<Document, 'id' | 'originalFilename' | 'description'>
      & { documentType: Pick<DocumentType, 'id' | 'code' | 'name'> }
    )>> }
    & DoorModelFragment
  )>, doorParts?: Maybe<Pick<DoorParts, 'lockLatch' | 'hinges' | 'closer' | 'spyhole' | 'letterbox' | 'thresholdStrip' | 'dropSeal' | 'handles' | 'smokeSeals' | 'cylinder' | 'intumescentStrip' | 'keeps' | 'numerals' | 'chain' | 'weatherSeals' | 'additionalComments'>>, status: Pick<Status, 'name' | 'code'>, site?: Maybe<Pick<Site, 'id' | 'name'>> }
);

export type DoorQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DoorQuery = { door: DoorFragment };

export type DoorByTagIdQueryVariables = Exact<{
  tagId: Scalars['String'];
}>;


export type DoorByTagIdQuery = { doorByTagId: DoorFragment };

export type DoorsQueryVariables = Exact<{
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sortField?: Maybe<Scalars['String']>;
  sortDirection?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['Boolean']>;
  tagged?: Maybe<Scalars['Boolean']>;
  statuses?: Maybe<Array<Scalars['String']>>;
}>;


export type DoorsQuery = { doors: (
    Pick<PaginatedDoorResponse, 'total' | 'hasMore'>
    & { items: Array<(
      Pick<Door, 'id' | 'doorReference' | 'projectReference'>
      & { status: Pick<Status, 'name' | 'code'> }
    )> }
  ) };

export type DoorHeaderFragment = (
  Pick<Door, 'id' | 'doorReference' | 'projectReference' | 'location'>
  & { status: Pick<Status, 'name' | 'code'>, site?: Maybe<Pick<Site, 'id' | 'name'>> }
);

export type DoorInstallationsInProgressQueryVariables = Exact<{
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  sortField?: Maybe<Scalars['String']>;
  sortDirection?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['Boolean']>;
  statuses?: Maybe<Array<Scalars['String']>>;
  tagged?: Maybe<Scalars['Boolean']>;
  excludeTransferred?: Maybe<Scalars['Boolean']>;
}>;


export type DoorInstallationsInProgressQuery = { doors: (
    Pick<PaginatedDoorResponse, 'total' | 'hasMore'>
    & { items: Array<DoorHeaderFragment> }
  ) };

export type AssignDoorTagMutationVariables = Exact<{
  id: Scalars['ID'];
  tag: Scalars['String'];
}>;


export type AssignDoorTagMutation = { assignDoorTag: Pick<Door, 'id' | 'tagId'> };

export type StartInstallationMutationVariables = Exact<{
  doorId: Scalars['ID'];
  siteId: Scalars['ID'];
  location: Scalars['String'];
}>;


export type StartInstallationMutation = Pick<Mutation, 'startInstallation'>;

export type StartInspectionMutationVariables = Exact<{
  doorId: Scalars['ID'];
}>;

export type RepairDoorMutationVariables = Exact<{
  repairDoorInput: RepairDoorInput;
}>;


export type RepairDoorMutation = Pick<Mutation, 'repairDoor'>;

export type RetireDoorsMutationVariables = Exact<{
  retireDoorInput: RetireDoorInput;
}>;

export type RetireDoorsMutation = Pick<Mutation, 'retireDoors'>;


export type StartInspectionMutation = Pick<Mutation, 'startInspection'>;

export type DoorModelPartsFragment = Pick<DoorModelParts, 'id' | 'lockLatch' | 'closer' | 'intumescentStrip' | 'hinges' | 'handles' | 'smokeSeals' | 'dropSeal' | 'cylinder' | 'letterbox' | 'spyhole' | 'thresholdStrip' | 'additionalComments'>;

export type DoorModelFragment = (
  Pick<DoorModel, 'id' | 'name' | 'coreSupplier'>
  & { fdRating?: Maybe<Pick<FdRating, 'id' | 'value'>>, doorModelParts?: Maybe<DoorModelPartsFragment> }
);

export type FailureRisksQueryVariables = {};


export type FailureRisksQuery = { failureRisks: Array<Pick<FailureRisk, 'id' | 'name'>> };

export type FireStoppingTypesQueryVariables = {};


export type FireStoppingTypesQuery = { fireStoppingTypes: Array<Pick<FireStoppingType, 'id' | 'name'>> };

export type InspectDoorMutationVariables = Exact<{
  checklist: InspectDoorInput;
}>;


export type InspectDoorMutation = Pick<Mutation, 'inspectDoor'>;

export type SignOffInspectionMutationVariables = Exact<{
  doorId: Scalars['ID'];
  isSuccess: Scalars['Boolean'];
  message: Scalars['String'];
  failureRiskId?: Maybe<Scalars['ID']>;
}>;


export type SignOffInspectionMutation = Pick<Mutation, 'signOffInspection'>;

export type CancelInspectionsMutationVariables = Exact<{
  idListInput: IdListInput;
}>;


export type CancelInspectionsMutation = Pick<Mutation, 'cancelInspections'>;

export type RecordDoorNotAccessibleMutationVariables = Exact<{
  details: RecordDoorNotAccessibleInput;
}>;


export type RecordDoorNotAccessibleMutation = Pick<Mutation, 'recordDoorNotAccessible'>;

export type InstallationsByDoorIdQueryVariables = Exact<{
  doorId: Scalars['ID'];
}>;


export type InstallationsByDoorIdQuery = { installationsByDoorId: Array<Pick<Installation, 'id' | 'isSignedOff'>> };

export type InstallDoorMutationVariables = Exact<{
  checklist: InstallDoorInput;
}>;


export type InstallDoorMutation = Pick<Mutation, 'installDoor'>;

export type SignOffInstallationMutationVariables = Exact<{
  doorId: Scalars['ID'];
  isSuccess: Scalars['Boolean'];
  message: Scalars['String'];
}>;


export type SignOffInstallationMutation = Pick<Mutation, 'signOffInstallation'>;

export type CancelInstallationsMutationVariables = Exact<{
  idListInput: IdListInput;
}>;


export type CancelInstallationsMutation = Pick<Mutation, 'cancelInstallations'>;

export type SitesByNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type SitesByNameQuery = { sitesByName: Array<Pick<Site, 'id' | 'name'>> };

export type LoggedInQueryVariables = {};


export type LoggedInQuery = { loggedIn: (
    Pick<User, 'id' | 'fullName' | 'email'>
    & { company?: Maybe<Pick<Company, 'id' | 'name'>>, roles: Array<Pick<Role, 'code' | 'name'>> }
  ) };

export const DoorModelPartsFragmentDoc = gql`
    fragment DoorModelParts on DoorModelParts {
  id
  lockLatch
  closer
  intumescentStrip
  hinges
  handles
  smokeSeals
  dropSeal
  cylinder
  letterbox
  spyhole
  thresholdStrip
  additionalComments
}
    `;
export const DoorModelFragmentDoc = gql`
    fragment DoorModel on DoorModel {
  id
  name
  coreSupplier
  fdRating {
    id
    value
  }
  doorModelParts {
    ...DoorModelParts
  }
}
    ${DoorModelPartsFragmentDoc}`;
export const DoorFragmentDoc = gql`
    fragment Door on Door {
  id
  projectReference
  doorReference
  tagId
  leaf1AccousticRating
  leaf1CoreSupplier
  leaf1Width
  leaf1Height
  leaf2AccousticRating
  leaf2CoreSupplier
  leaf2Width
  leaf2Height
  fdRating {
    id
    value
  }
  documents {
    id
    originalFilename
    description
    documentType {
      id
      code
      name
    }
  }
  model {
    ...DoorModel
    documents {
      id
      originalFilename
      description
      documentType {
        id
        code
        name
      }
    }
  }
  doorParts {
    lockLatch
    hinges
    closer
    spyhole
    letterbox
    thresholdStrip
    dropSeal
    handles
    smokeSeals
    cylinder
    intumescentStrip
    keeps
    numerals
    chain
    weatherSeals
    additionalComments
  }
  status {
    name
    code
  }
  site {
    id
    name
  }
  location
}
    ${DoorModelFragmentDoc}`;
export const DoorHeaderFragmentDoc = gql`
    fragment DoorHeader on Door {
  id
  doorReference
  projectReference
  status {
    name
    code
  }
  site {
    id
    name
  }
  location
}
    `;
export const ChecklistAnswersByInstallationIdDocument = gql`
    query checklistAnswersByInstallationId($installationId: Float!) {
  checklistAnswersByInstallationId(installationId: $installationId) {
    answer
    installationId
    checklistQuestion {
      id
      name
      code
    }
    documents {
      documentId
      photoKey
    }
  }
}
    `;

/**
 * __useChecklistAnswersByInstallationIdQuery__
 *
 * To run a query within a React component, call `useChecklistAnswersByInstallationIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useChecklistAnswersByInstallationIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChecklistAnswersByInstallationIdQuery({
 *   variables: {
 *      installationId: // value for 'installationId'
 *   },
 * });
 */
export function useChecklistAnswersByInstallationIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ChecklistAnswersByInstallationIdQuery, ChecklistAnswersByInstallationIdQueryVariables>) {
        return ApolloReactHooks.useQuery<ChecklistAnswersByInstallationIdQuery, ChecklistAnswersByInstallationIdQueryVariables>(ChecklistAnswersByInstallationIdDocument, baseOptions);
      }
export function useChecklistAnswersByInstallationIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ChecklistAnswersByInstallationIdQuery, ChecklistAnswersByInstallationIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ChecklistAnswersByInstallationIdQuery, ChecklistAnswersByInstallationIdQueryVariables>(ChecklistAnswersByInstallationIdDocument, baseOptions);
        }
export type ChecklistAnswersByInstallationIdQueryHookResult = ReturnType<typeof useChecklistAnswersByInstallationIdQuery>;
export type ChecklistAnswersByInstallationIdLazyQueryHookResult = ReturnType<typeof useChecklistAnswersByInstallationIdLazyQuery>;
export type ChecklistAnswersByInstallationIdQueryResult = ApolloReactCommon.QueryResult<ChecklistAnswersByInstallationIdQuery, ChecklistAnswersByInstallationIdQueryVariables>;
export const ChecklistQuestionsDocument = gql`
    query checklistQuestions($code: String!) {
  checklistQuestions(code: $code) {
    id
    name
    code
  }
}
    `;

/**
 * __useChecklistQuestionsQuery__
 *
 * To run a query within a React component, call `useChecklistQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChecklistQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChecklistQuestionsQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useChecklistQuestionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ChecklistQuestionsQuery, ChecklistQuestionsQueryVariables>) {
        return ApolloReactHooks.useQuery<ChecklistQuestionsQuery, ChecklistQuestionsQueryVariables>(ChecklistQuestionsDocument, baseOptions);
      }
export function useChecklistQuestionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ChecklistQuestionsQuery, ChecklistQuestionsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ChecklistQuestionsQuery, ChecklistQuestionsQueryVariables>(ChecklistQuestionsDocument, baseOptions);
        }
export type ChecklistQuestionsQueryHookResult = ReturnType<typeof useChecklistQuestionsQuery>;
export type ChecklistQuestionsLazyQueryHookResult = ReturnType<typeof useChecklistQuestionsLazyQuery>;
export type ChecklistQuestionsQueryResult = ApolloReactCommon.QueryResult<ChecklistQuestionsQuery, ChecklistQuestionsQueryVariables>;
export const CompanyDocument = gql`
    query company($id: ID!) {
  company(id: $id) {
    id
    name
    types {
      id
      code
      name
    }
    admin {
      fullName
      email
    }
    contactPhone
    billingEmail
    billingAddressOne
    billingAddressTwo
    billingCity
    billingPostcode
    passedReportsForCurrentMonth
  }
}
    `;

/**
 * __useCompanyQuery__
 *
 * To run a query within a React component, call `useCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompanyQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCompanyQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CompanyQuery, CompanyQueryVariables>) {
        return ApolloReactHooks.useQuery<CompanyQuery, CompanyQueryVariables>(CompanyDocument, baseOptions);
      }
export function useCompanyLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CompanyQuery, CompanyQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CompanyQuery, CompanyQueryVariables>(CompanyDocument, baseOptions);
        }
export type CompanyQueryHookResult = ReturnType<typeof useCompanyQuery>;
export type CompanyLazyQueryHookResult = ReturnType<typeof useCompanyLazyQuery>;
export type CompanyQueryResult = ApolloReactCommon.QueryResult<CompanyQuery, CompanyQueryVariables>;
export const DoorDocument = gql`
    query door($id: ID!) {
  door(id: $id) {
    ...Door
  }
}
    ${DoorFragmentDoc}`;

/**
 * __useDoorQuery__
 *
 * To run a query within a React component, call `useDoorQuery` and pass it any options that fit your needs.
 * When your component renders, `useDoorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDoorQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDoorQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<DoorQuery, DoorQueryVariables>) {
        return ApolloReactHooks.useQuery<DoorQuery, DoorQueryVariables>(DoorDocument, baseOptions);
      }
export function useDoorLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<DoorQuery, DoorQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<DoorQuery, DoorQueryVariables>(DoorDocument, baseOptions);
        }
export type DoorQueryHookResult = ReturnType<typeof useDoorQuery>;
export type DoorLazyQueryHookResult = ReturnType<typeof useDoorLazyQuery>;
export type DoorQueryResult = ApolloReactCommon.QueryResult<DoorQuery, DoorQueryVariables>;
export const DoorByTagIdDocument = gql`
    query doorByTagId($tagId: String!) {
  doorByTagId(tagId: $tagId) {
    ...Door
  }
}
    ${DoorFragmentDoc}`;

/**
 * __useDoorByTagIdQuery__
 *
 * To run a query within a React component, call `useDoorByTagIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useDoorByTagIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDoorByTagIdQuery({
 *   variables: {
 *      tagId: // value for 'tagId'
 *   },
 * });
 */
export function useDoorByTagIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<DoorByTagIdQuery, DoorByTagIdQueryVariables>) {
        return ApolloReactHooks.useQuery<DoorByTagIdQuery, DoorByTagIdQueryVariables>(DoorByTagIdDocument, baseOptions);
      }
export function useDoorByTagIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<DoorByTagIdQuery, DoorByTagIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<DoorByTagIdQuery, DoorByTagIdQueryVariables>(DoorByTagIdDocument, baseOptions);
        }
export type DoorByTagIdQueryHookResult = ReturnType<typeof useDoorByTagIdQuery>;
export type DoorByTagIdLazyQueryHookResult = ReturnType<typeof useDoorByTagIdLazyQuery>;
export type DoorByTagIdQueryResult = ApolloReactCommon.QueryResult<DoorByTagIdQuery, DoorByTagIdQueryVariables>;
export const DoorsDocument = gql`
    query doors($skip: Int, $take: Int, $sortField: String, $sortDirection: String, $active: Boolean, $tagged: Boolean, $statuses: [String!]) {
  doors(skip: $skip, take: $take, sortField: $sortField, sortDirection: $sortDirection, active: $active, tagged: $tagged, statuses: $statuses) {
    items {
      id
      doorReference
      projectReference
      status {
        name
        code
      }
    }
    total
    hasMore
  }
}
    `;

/**
 * __useDoorsQuery__
 *
 * To run a query within a React component, call `useDoorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDoorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDoorsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      sortField: // value for 'sortField'
 *      sortDirection: // value for 'sortDirection'
 *      active: // value for 'active'
 *      tagged: // value for 'tagged'
 *      statuses: // value for 'statuses'
 *   },
 * });
 */
export function useDoorsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<DoorsQuery, DoorsQueryVariables>) {
        return ApolloReactHooks.useQuery<DoorsQuery, DoorsQueryVariables>(DoorsDocument, baseOptions);
      }
export function useDoorsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<DoorsQuery, DoorsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<DoorsQuery, DoorsQueryVariables>(DoorsDocument, baseOptions);
        }
export type DoorsQueryHookResult = ReturnType<typeof useDoorsQuery>;
export type DoorsLazyQueryHookResult = ReturnType<typeof useDoorsLazyQuery>;
export type DoorsQueryResult = ApolloReactCommon.QueryResult<DoorsQuery, DoorsQueryVariables>;
export const DoorInstallationsInProgressDocument = gql`
    query doorInstallationsInProgress($skip: Int, $take: Int, $sortField: String, $sortDirection: String, $active: Boolean, $statuses: [String!], $tagged: Boolean, $excludeTransferred: Boolean) {
  doors(skip: $skip, take: $take, sortField: $sortField, sortDirection: $sortDirection, active: $active, statuses: $statuses, tagged: $tagged, excludeTransferred: $excludeTransferred) {
    items {
      ...DoorHeader
    }
    total
    hasMore
  }
}
    ${DoorHeaderFragmentDoc}`;

/**
 * __useDoorInstallationsInProgressQuery__
 *
 * To run a query within a React component, call `useDoorInstallationsInProgressQuery` and pass it any options that fit your needs.
 * When your component renders, `useDoorInstallationsInProgressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDoorInstallationsInProgressQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      sortField: // value for 'sortField'
 *      sortDirection: // value for 'sortDirection'
 *      active: // value for 'active'
 *      statuses: // value for 'statuses'
 *      tagged: // value for 'tagged'
 *      excludeTransferred: // value for 'excludeTransferred'
 *   },
 * });
 */
export function useDoorInstallationsInProgressQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<DoorInstallationsInProgressQuery, DoorInstallationsInProgressQueryVariables>) {
        return ApolloReactHooks.useQuery<DoorInstallationsInProgressQuery, DoorInstallationsInProgressQueryVariables>(DoorInstallationsInProgressDocument, baseOptions);
      }
export function useDoorInstallationsInProgressLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<DoorInstallationsInProgressQuery, DoorInstallationsInProgressQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<DoorInstallationsInProgressQuery, DoorInstallationsInProgressQueryVariables>(DoorInstallationsInProgressDocument, baseOptions);
        }
export type DoorInstallationsInProgressQueryHookResult = ReturnType<typeof useDoorInstallationsInProgressQuery>;
export type DoorInstallationsInProgressLazyQueryHookResult = ReturnType<typeof useDoorInstallationsInProgressLazyQuery>;
export type DoorInstallationsInProgressQueryResult = ApolloReactCommon.QueryResult<DoorInstallationsInProgressQuery, DoorInstallationsInProgressQueryVariables>;
export const AssignDoorTagDocument = gql`
    mutation assignDoorTag($id: ID!, $tag: String!) {
  assignDoorTag(id: $id, tag: $tag) {
    id
    tagId
  }
}
    `;
export type AssignDoorTagMutationFn = ApolloReactCommon.MutationFunction<AssignDoorTagMutation, AssignDoorTagMutationVariables>;

/**
 * __useAssignDoorTagMutation__
 *
 * To run a mutation, you first call `useAssignDoorTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignDoorTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignDoorTagMutation, { data, loading, error }] = useAssignDoorTagMutation({
 *   variables: {
 *      id: // value for 'id'
 *      tag: // value for 'tag'
 *   },
 * });
 */
export function useAssignDoorTagMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AssignDoorTagMutation, AssignDoorTagMutationVariables>) {
        return ApolloReactHooks.useMutation<AssignDoorTagMutation, AssignDoorTagMutationVariables>(AssignDoorTagDocument, baseOptions);
      }
export type AssignDoorTagMutationHookResult = ReturnType<typeof useAssignDoorTagMutation>;
export type AssignDoorTagMutationResult = ApolloReactCommon.MutationResult<AssignDoorTagMutation>;
export type AssignDoorTagMutationOptions = ApolloReactCommon.BaseMutationOptions<AssignDoorTagMutation, AssignDoorTagMutationVariables>;
export const StartInstallationDocument = gql`
    mutation startInstallation($doorId: ID!, $siteId: ID!, $location: String!) {
  startInstallation(doorId: $doorId, siteId: $siteId, location: $location)
}
    `;
export type StartInstallationMutationFn = ApolloReactCommon.MutationFunction<StartInstallationMutation, StartInstallationMutationVariables>;

/**
 * __useStartInstallationMutation__
 *
 * To run a mutation, you first call `useStartInstallationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartInstallationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startInstallationMutation, { data, loading, error }] = useStartInstallationMutation({
 *   variables: {
 *      doorId: // value for 'doorId'
 *      siteId: // value for 'siteId'
 *      location: // value for 'location'
 *   },
 * });
 */
export function useStartInstallationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<StartInstallationMutation, StartInstallationMutationVariables>) {
        return ApolloReactHooks.useMutation<StartInstallationMutation, StartInstallationMutationVariables>(StartInstallationDocument, baseOptions);
      }
export type StartInstallationMutationHookResult = ReturnType<typeof useStartInstallationMutation>;
export type StartInstallationMutationResult = ApolloReactCommon.MutationResult<StartInstallationMutation>;
export type StartInstallationMutationOptions = ApolloReactCommon.BaseMutationOptions<StartInstallationMutation, StartInstallationMutationVariables>;
export const StartInspectionDocument = gql`
    mutation startInspection($doorId: ID!) {
  startInspection(doorId: $doorId)
}
    `;
export type StartInspectionMutationFn = ApolloReactCommon.MutationFunction<StartInspectionMutation, StartInspectionMutationVariables>;

/**
 * __useStartInspectionMutation__
 *
 * To run a mutation, you first call `useStartInspectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartInspectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startInspectionMutation, { data, loading, error }] = useStartInspectionMutation({
 *   variables: {
 *      doorId: // value for 'doorId'
 *   },
 * });
 */
export function useStartInspectionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<StartInspectionMutation, StartInspectionMutationVariables>) {
        return ApolloReactHooks.useMutation<StartInspectionMutation, StartInspectionMutationVariables>(StartInspectionDocument, baseOptions);
      }
export type StartInspectionMutationHookResult = ReturnType<typeof useStartInspectionMutation>;
export type StartInspectionMutationResult = ApolloReactCommon.MutationResult<StartInspectionMutation>;
export type StartInspectionMutationOptions = ApolloReactCommon.BaseMutationOptions<StartInspectionMutation, StartInspectionMutationVariables>;
export const FailureRisksDocument = gql`
    query failureRisks {
  failureRisks {
    id
    name
  }
}
    `;

/**
 * __useFailureRisksQuery__
 *
 * To run a query within a React component, call `useFailureRisksQuery` and pass it any options that fit your needs.
 * When your component renders, `useFailureRisksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFailureRisksQuery({
 *   variables: {
 *   },
 * });
 */
export function useFailureRisksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FailureRisksQuery, FailureRisksQueryVariables>) {
        return ApolloReactHooks.useQuery<FailureRisksQuery, FailureRisksQueryVariables>(FailureRisksDocument, baseOptions);
      }
export function useFailureRisksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FailureRisksQuery, FailureRisksQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FailureRisksQuery, FailureRisksQueryVariables>(FailureRisksDocument, baseOptions);
        }
export type FailureRisksQueryHookResult = ReturnType<typeof useFailureRisksQuery>;
export type FailureRisksLazyQueryHookResult = ReturnType<typeof useFailureRisksLazyQuery>;
export type FailureRisksQueryResult = ApolloReactCommon.QueryResult<FailureRisksQuery, FailureRisksQueryVariables>;
export const FireStoppingTypesDocument = gql`
    query fireStoppingTypes {
  fireStoppingTypes {
    id
    name
  }
}
    `;

/**
 * __useFireStoppingTypesQuery__
 *
 * To run a query within a React component, call `useFireStoppingTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFireStoppingTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFireStoppingTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFireStoppingTypesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FireStoppingTypesQuery, FireStoppingTypesQueryVariables>) {
        return ApolloReactHooks.useQuery<FireStoppingTypesQuery, FireStoppingTypesQueryVariables>(FireStoppingTypesDocument, baseOptions);
      }
export function useFireStoppingTypesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FireStoppingTypesQuery, FireStoppingTypesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FireStoppingTypesQuery, FireStoppingTypesQueryVariables>(FireStoppingTypesDocument, baseOptions);
        }
export type FireStoppingTypesQueryHookResult = ReturnType<typeof useFireStoppingTypesQuery>;
export type FireStoppingTypesLazyQueryHookResult = ReturnType<typeof useFireStoppingTypesLazyQuery>;
export type FireStoppingTypesQueryResult = ApolloReactCommon.QueryResult<FireStoppingTypesQuery, FireStoppingTypesQueryVariables>;
export const InspectDoorDocument = gql`
    mutation inspectDoor($checklist: InspectDoorInput!) {
  inspectDoor(checklist: $checklist)
}
    `;
export type InspectDoorMutationFn = ApolloReactCommon.MutationFunction<InspectDoorMutation, InspectDoorMutationVariables>;

/**
 * __useInspectDoorMutation__
 *
 * To run a mutation, you first call `useInspectDoorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInspectDoorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inspectDoorMutation, { data, loading, error }] = useInspectDoorMutation({
 *   variables: {
 *      checklist: // value for 'checklist'
 *   },
 * });
 */
export function useInspectDoorMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InspectDoorMutation, InspectDoorMutationVariables>) {
        return ApolloReactHooks.useMutation<InspectDoorMutation, InspectDoorMutationVariables>(InspectDoorDocument, baseOptions);
      }
export type InspectDoorMutationHookResult = ReturnType<typeof useInspectDoorMutation>;
export type InspectDoorMutationResult = ApolloReactCommon.MutationResult<InspectDoorMutation>;
export type InspectDoorMutationOptions = ApolloReactCommon.BaseMutationOptions<InspectDoorMutation, InspectDoorMutationVariables>;
export const SignOffInspectionDocument = gql`
    mutation signOffInspection($doorId: ID!, $isSuccess: Boolean!, $message: String!, $failureRiskId: ID) {
  signOffInspection(doorId: $doorId, isSuccess: $isSuccess, message: $message, failureRiskId: $failureRiskId)
}
    `;
export type SignOffInspectionMutationFn = ApolloReactCommon.MutationFunction<SignOffInspectionMutation, SignOffInspectionMutationVariables>;

/**
 * __useSignOffInspectionMutation__
 *
 * To run a mutation, you first call `useSignOffInspectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOffInspectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOffInspectionMutation, { data, loading, error }] = useSignOffInspectionMutation({
 *   variables: {
 *      doorId: // value for 'doorId'
 *      isSuccess: // value for 'isSuccess'
 *      message: // value for 'message'
 *      failureRiskId: // value for 'failureRiskId'
 *   },
 * });
 */
export function useSignOffInspectionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignOffInspectionMutation, SignOffInspectionMutationVariables>) {
        return ApolloReactHooks.useMutation<SignOffInspectionMutation, SignOffInspectionMutationVariables>(SignOffInspectionDocument, baseOptions);
      }
export type SignOffInspectionMutationHookResult = ReturnType<typeof useSignOffInspectionMutation>;
export type SignOffInspectionMutationResult = ApolloReactCommon.MutationResult<SignOffInspectionMutation>;
export type SignOffInspectionMutationOptions = ApolloReactCommon.BaseMutationOptions<SignOffInspectionMutation, SignOffInspectionMutationVariables>;
export const CancelInspectionsDocument = gql`
    mutation cancelInspections($idListInput: IdListInput!) {
  cancelInspections(idListInput: $idListInput)
}
    `;
export type CancelInspectionsMutationFn = ApolloReactCommon.MutationFunction<CancelInspectionsMutation, CancelInspectionsMutationVariables>;

/**
 * __useCancelInspectionsMutation__
 *
 * To run a mutation, you first call `useCancelInspectionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelInspectionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelInspectionsMutation, { data, loading, error }] = useCancelInspectionsMutation({
 *   variables: {
 *      idListInput: // value for 'idListInput'
 *   },
 * });
 */
export function useCancelInspectionsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CancelInspectionsMutation, CancelInspectionsMutationVariables>) {
        return ApolloReactHooks.useMutation<CancelInspectionsMutation, CancelInspectionsMutationVariables>(CancelInspectionsDocument, baseOptions);
      }
export type CancelInspectionsMutationHookResult = ReturnType<typeof useCancelInspectionsMutation>;
export type CancelInspectionsMutationResult = ApolloReactCommon.MutationResult<CancelInspectionsMutation>;
export type CancelInspectionsMutationOptions = ApolloReactCommon.BaseMutationOptions<CancelInspectionsMutation, CancelInspectionsMutationVariables>;
export const RecordDoorNotAccessibleDocument = gql`
    mutation recordDoorNotAccessible($details: RecordDoorNotAccessibleInput!) {
  recordDoorNotAccessible(details: $details)
}
    `;
export type RecordDoorNotAccessibleMutationFn = ApolloReactCommon.MutationFunction<RecordDoorNotAccessibleMutation, RecordDoorNotAccessibleMutationVariables>;

/**
 * __useRecordDoorNotAccessibleMutation__
 *
 * To run a mutation, you first call `useRecordDoorNotAccessibleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRecordDoorNotAccessibleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [recordDoorNotAccessibleMutation, { data, loading, error }] = useRecordDoorNotAccessibleMutation({
 *   variables: {
 *      details: // value for 'details'
 *   },
 * });
 */
export function useRecordDoorNotAccessibleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RecordDoorNotAccessibleMutation, RecordDoorNotAccessibleMutationVariables>) {
        return ApolloReactHooks.useMutation<RecordDoorNotAccessibleMutation, RecordDoorNotAccessibleMutationVariables>(RecordDoorNotAccessibleDocument, baseOptions);
      }
export type RecordDoorNotAccessibleMutationHookResult = ReturnType<typeof useRecordDoorNotAccessibleMutation>;
export type RecordDoorNotAccessibleMutationResult = ApolloReactCommon.MutationResult<RecordDoorNotAccessibleMutation>;
export type RecordDoorNotAccessibleMutationOptions = ApolloReactCommon.BaseMutationOptions<RecordDoorNotAccessibleMutation, RecordDoorNotAccessibleMutationVariables>;
export const InstallationsByDoorIdDocument = gql`
    query installationsByDoorId($doorId: ID!) {
  installationsByDoorId(doorId: $doorId) {
    id
    isSignedOff
  }
}
    `;

/**
 * __useInstallationsByDoorIdQuery__
 *
 * To run a query within a React component, call `useInstallationsByDoorIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useInstallationsByDoorIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInstallationsByDoorIdQuery({
 *   variables: {
 *      doorId: // value for 'doorId'
 *   },
 * });
 */
export function useInstallationsByDoorIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<InstallationsByDoorIdQuery, InstallationsByDoorIdQueryVariables>) {
        return ApolloReactHooks.useQuery<InstallationsByDoorIdQuery, InstallationsByDoorIdQueryVariables>(InstallationsByDoorIdDocument, baseOptions);
      }
export function useInstallationsByDoorIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<InstallationsByDoorIdQuery, InstallationsByDoorIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<InstallationsByDoorIdQuery, InstallationsByDoorIdQueryVariables>(InstallationsByDoorIdDocument, baseOptions);
        }
export type InstallationsByDoorIdQueryHookResult = ReturnType<typeof useInstallationsByDoorIdQuery>;
export type InstallationsByDoorIdLazyQueryHookResult = ReturnType<typeof useInstallationsByDoorIdLazyQuery>;
export type InstallationsByDoorIdQueryResult = ApolloReactCommon.QueryResult<InstallationsByDoorIdQuery, InstallationsByDoorIdQueryVariables>;
export const InstallDoorDocument = gql`
    mutation installDoor($checklist: InstallDoorInput!) {
  installDoor(checklist: $checklist)
}
    `;
export type InstallDoorMutationFn = ApolloReactCommon.MutationFunction<InstallDoorMutation, InstallDoorMutationVariables>;

/**
 * __useInstallDoorMutation__
 *
 * To run a mutation, you first call `useInstallDoorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInstallDoorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [installDoorMutation, { data, loading, error }] = useInstallDoorMutation({
 *   variables: {
 *      checklist: // value for 'checklist'
 *   },
 * });
 */
export function useInstallDoorMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InstallDoorMutation, InstallDoorMutationVariables>) {
        return ApolloReactHooks.useMutation<InstallDoorMutation, InstallDoorMutationVariables>(InstallDoorDocument, baseOptions);
      }
export type InstallDoorMutationHookResult = ReturnType<typeof useInstallDoorMutation>;
export type InstallDoorMutationResult = ApolloReactCommon.MutationResult<InstallDoorMutation>;
export type InstallDoorMutationOptions = ApolloReactCommon.BaseMutationOptions<InstallDoorMutation, InstallDoorMutationVariables>;
export const SignOffInstallationDocument = gql`
    mutation signOffInstallation($doorId: ID!, $isSuccess: Boolean!, $message: String!) {
  signOffInstallation(doorId: $doorId, isSuccess: $isSuccess, message: $message)
}
    `;
export type SignOffInstallationMutationFn = ApolloReactCommon.MutationFunction<SignOffInstallationMutation, SignOffInstallationMutationVariables>;

/**
 * __useSignOffInstallationMutation__
 *
 * To run a mutation, you first call `useSignOffInstallationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOffInstallationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOffInstallationMutation, { data, loading, error }] = useSignOffInstallationMutation({
 *   variables: {
 *      doorId: // value for 'doorId'
 *      isSuccess: // value for 'isSuccess'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useSignOffInstallationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignOffInstallationMutation, SignOffInstallationMutationVariables>) {
        return ApolloReactHooks.useMutation<SignOffInstallationMutation, SignOffInstallationMutationVariables>(SignOffInstallationDocument, baseOptions);
      }
export type SignOffInstallationMutationHookResult = ReturnType<typeof useSignOffInstallationMutation>;
export type SignOffInstallationMutationResult = ApolloReactCommon.MutationResult<SignOffInstallationMutation>;
export type SignOffInstallationMutationOptions = ApolloReactCommon.BaseMutationOptions<SignOffInstallationMutation, SignOffInstallationMutationVariables>;

export const RepairDoorDocument = gql`
    mutation repairDoor($repairDoorInput: RepairDoorInput!) {
        repairDoor(repairDoorInput: $repairDoorInput)
    }
`;
export type RepairDoorMutationFn = ApolloReactCommon.MutationFunction<RepairDoorMutation, RepairDoorMutationVariables>;

/**
 * __useRepairDoorMutation__
 *
 * To run a mutation, you first call `useRepairDoorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRepairDoorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [repairDoorMutation, { data, loading, error }] = useRepairDoorMutation({
 *   variables: {
 *      repairDoorInput: // value for 'repairDoorInput'
 *   },
 * });
 */
export function useRepairDoorMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RepairDoorMutation, RepairDoorMutationVariables>) {
  return ApolloReactHooks.useMutation<RepairDoorMutation, RepairDoorMutationVariables>(RepairDoorDocument, baseOptions);
}
export type RepairDoorMutationHookResult = ReturnType<typeof useRepairDoorMutation>;
export type RepairDoorMutationResult = ApolloReactCommon.MutationResult<RepairDoorMutation>;
export type RepairDoorMutationOptions = ApolloReactCommon.BaseMutationOptions<RepairDoorMutation, RepairDoorMutationVariables>;

export const RetireDoorsDocument = gql`
    mutation retireDoors($retireDoorInput: RetireDoorInput!) {
        retireDoors(retireDoorInput: $retireDoorInput)
    }
`;
export type RetireDoorsMutationFn = ApolloReactCommon.MutationFunction<RetireDoorsMutation, RetireDoorsMutationVariables>;

/**
 * __useRetireDoorsMutation__
 *
 * To run a mutation, you first call `useRetireDoorsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRetireDoorsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [retireDoorsMutation, { data, loading, error }] = useRetireDoorsMutation({
 *   variables: {
 *      retireDoorInput: // value for 'retireDoorInput'
 *   },
 * });
 */
export function useRetireDoorsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RetireDoorsMutation, RetireDoorsMutationVariables>) {
  return ApolloReactHooks.useMutation<RetireDoorsMutation, RetireDoorsMutationVariables>(RetireDoorsDocument, baseOptions);
}
export type RetireDoorsMutationHookResult = ReturnType<typeof useRetireDoorsMutation>;
export type RetireDoorsMutationResult = ApolloReactCommon.MutationResult<RetireDoorsMutation>;
export type RetireDoorsMutationOptions = ApolloReactCommon.BaseMutationOptions<RetireDoorsMutation, RetireDoorsMutationVariables>;

export const CancelInstallationsDocument = gql`
    mutation cancelInstallations($idListInput: IdListInput!) {
  cancelInstallations(idListInput: $idListInput)
}
    `;
export type CancelInstallationsMutationFn = ApolloReactCommon.MutationFunction<CancelInstallationsMutation, CancelInstallationsMutationVariables>;

/**
 * __useCancelInstallationsMutation__
 *
 * To run a mutation, you first call `useCancelInstallationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelInstallationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelInstallationsMutation, { data, loading, error }] = useCancelInstallationsMutation({
 *   variables: {
 *      idListInput: // value for 'idListInput'
 *   },
 * });
 */
export function useCancelInstallationsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CancelInstallationsMutation, CancelInstallationsMutationVariables>) {
        return ApolloReactHooks.useMutation<CancelInstallationsMutation, CancelInstallationsMutationVariables>(CancelInstallationsDocument, baseOptions);
      }
export type CancelInstallationsMutationHookResult = ReturnType<typeof useCancelInstallationsMutation>;
export type CancelInstallationsMutationResult = ApolloReactCommon.MutationResult<CancelInstallationsMutation>;
export type CancelInstallationsMutationOptions = ApolloReactCommon.BaseMutationOptions<CancelInstallationsMutation, CancelInstallationsMutationVariables>;
export const SitesByNameDocument = gql`
    query sitesByName($name: String!) {
  sitesByName(name: $name) {
    id
    name
  }
}
    `;

/**
 * __useSitesByNameQuery__
 *
 * To run a query within a React component, call `useSitesByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useSitesByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSitesByNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSitesByNameQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SitesByNameQuery, SitesByNameQueryVariables>) {
        return ApolloReactHooks.useQuery<SitesByNameQuery, SitesByNameQueryVariables>(SitesByNameDocument, baseOptions);
      }
export function useSitesByNameLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SitesByNameQuery, SitesByNameQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SitesByNameQuery, SitesByNameQueryVariables>(SitesByNameDocument, baseOptions);
        }
export type SitesByNameQueryHookResult = ReturnType<typeof useSitesByNameQuery>;
export type SitesByNameLazyQueryHookResult = ReturnType<typeof useSitesByNameLazyQuery>;
export type SitesByNameQueryResult = ApolloReactCommon.QueryResult<SitesByNameQuery, SitesByNameQueryVariables>;
export const LoggedInDocument = gql`
    query LoggedIn {
  loggedIn {
    id
    fullName
    email
    company {
      id
      name
    }
    roles {
      code
      name
    }
  }
}
    `;

/**
 * __useLoggedInQuery__
 *
 * To run a query within a React component, call `useLoggedInQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoggedInQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoggedInQuery({
 *   variables: {
 *   },
 * });
 */
export function useLoggedInQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LoggedInQuery, LoggedInQueryVariables>) {
        return ApolloReactHooks.useQuery<LoggedInQuery, LoggedInQueryVariables>(LoggedInDocument, baseOptions);
      }
export function useLoggedInLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LoggedInQuery, LoggedInQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<LoggedInQuery, LoggedInQueryVariables>(LoggedInDocument, baseOptions);
        }
export type LoggedInQueryHookResult = ReturnType<typeof useLoggedInQuery>;
export type LoggedInLazyQueryHookResult = ReturnType<typeof useLoggedInLazyQuery>;
export type LoggedInQueryResult = ApolloReactCommon.QueryResult<LoggedInQuery, LoggedInQueryVariables>;

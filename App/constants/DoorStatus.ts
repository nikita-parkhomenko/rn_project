enum DoorStatus {
  ManufacturerIncomplete = 'ManufacturerIncomplete',
  ManufacturerReady = 'ManufacturerReady',
  InstallerReady = 'InstallerReady',
  InstallerInstalling = 'InstallerInstalling',
  InstallerRequiresSignOff = 'InstallerRequiresSignOff',
  InstallerFailedSignOff = 'InstallerFailedSignOff',
  InstallerInstallationComplete = 'InstallerInstallationComplete',
  InspectionDue = 'InspectionDue',
  InspectionOverdue = 'InspectionOverdue',
  InspectionFailedSignOff = 'InspectionFailedSignOff',
  Inspecting = 'Inspecting',
  RequiresRepair = 'RequiresRepair',
  InspectionRequiresSignOff = 'InspectionRequiresSignOff',
}
export default DoorStatus;

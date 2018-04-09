import path = require('path');
import sign = require('ios-signing-common/ios-signing-common');
import secureFilesCommon = require('securefiles-common/securefiles-common');
import tl = require('vsts-task-lib/task');

import { ToolRunner } from 'vsts-task-lib/toolrunner';

async function run() {
    let secureFileId: string;
    let secureFileHelpers: secureFilesCommon.SecureFileHelpers;

    try {
        tl.setResourcePath(path.join(__dirname, 'task.json'));

        if (tl.getInput('provisioningProfileLocation') === 'secureFiles') {
            // download decrypted contents
            secureFileId = tl.getInput('provProfileSecureFile', true);
            secureFileHelpers = new secureFilesCommon.SecureFileHelpers();
            let provProfilePath: string = await secureFileHelpers.downloadSecureFile(secureFileId);

            if (tl.exist(provProfilePath)) {
                const { provProfileUUID, provProfileName } = await sign.getProvisioningProfileInfo(provProfilePath);
                tl.setTaskVariable('APPLE_PROV_PROFILE_UUID', provProfileUUID);

                // set the provisioning profile output variable.
                tl.setVariable('provisioningProfileUuid', provProfileUUID);
                tl.setVariable('provisioningProfileName', provProfileName);

                // Set the legacy variable that doesn't use the task's refName, unlike our output variables.
                // If there are multiple InstallAppleCertificate tasks, the last one wins.
                tl.setVariable('APPLE_PROV_PROFILE_UUID', provProfileUUID);
            }
        }

    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, err);
    } finally {
        // delete provisioning profile from temp location after installing
        if (secureFileId && secureFileHelpers) {
            secureFileHelpers.deleteSecureFile(secureFileId);
        }
    }
}

run();
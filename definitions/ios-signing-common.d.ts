/// <reference path="./vsts-task-lib.d.ts" />

declare module 'ios-signing-common/ios-signing-common' {

    /**
     * Creates a temporary keychain and installs the P12 cert in the temporary keychain
     * @param keychainPath, the path to the keychain file
     * @param keychainPwd, the password to use for unlocking the keychain
     * @param p12CertPath, the P12 cert to be installed in the keychain
     * @param p12Pwd, the password for the P12 cert
     */
    export function installCertInTemporaryKeychain(keychainPath : string, keychainPwd: string, p12CertPath : string, p12Pwd: string);

    /**
    * Finds an iOS codesigning identity in the specified keychain
    * @param keychainPath
    * @returns {string} signing identity found
    */
    export function findSigningIdentity(keychainPath: string) : string;

    /**
     * Find the UUID and Name of the provisioning profile and install the profile
     * @param provProfilePath
     * @returns { provProfileUUID, provProfileName }
     */
    export function getProvisioningProfileInfo(provProfilePath: string) : Promise<{ provProfileUUID: string, provProfileName: string }>;

    /**
     * Find the type of the provisioning profile - development, app-store or ad-hoc
     * @param provProfilePath
     * @returns {string} type
     */
    export function getProvisioningProfileType(provProfilePath: string) : string;

    /**
     * Delete specified iOS keychain
     * @param keychainPath
     */
    export function deleteKeychain(keychainPath: string);

    /**
     * Unlock specified iOS keychain
     * @param keychainPath
     * @param keychainPwd
     */
    export function unlockKeychain(keychainPath: string, keychainPwd: string);

    /**
     * Delete provisioning profile with specified UUID in the user's profiles directory
     * @param uuid
     */
    export function deleteProvisioningProfile(uuid: string);

    /**
     * Gets the path to the iOS default keychain
     */
    export function getDefaultKeychainPath() : string;

    /**
     * Get Cloud entitlement type Production or Development according to the export method - if entitlement doesn't exists in provisioning profile returns null
     * @param provisioningProfilePath
     * @param exportMethod
     * @returns {string}
     */
    export function getCloudEntitlement(provisioningProfilePath: string, exportMethod: string): Promise<string>
}
import { getDomainData } from "./domainData"
import { getDomainRenewals } from "./domainRenewal"
import { getTransfers } from "./transfers"
import { getWrappedTransfers } from "./wrappedTransfers"

export const retrieveData = async (ens: string) => {

    // Generate namehash
    const namehash = require('eth-ens-namehash')
    const hash = namehash.hash(ens)

    // Requests to be done
    const promises = [
        getDomainData(ens),
        getTransfers(hash),
        getWrappedTransfers(hash),
        getDomainRenewals(ens)
    ]

    const data = await Promise.all(promises).then((result) => {
        // Process createdAtData
        const createdAtData = [{
            date: new Date(result[0][0].createdAt),
            eventType: 'domainRegistration',
            initialDomainOwner: result[0].ownerId,
            domainRegistrantId: result[0].registrantId,
            initialExpiryDate: new Date(result[0][0].initialExpiryDate),
            ownerLookedUp: result[0].ownerLookedUp,
            registrarLookedUp: result[0].registrarLookedUp
        }]

        // Process transfers, wrappedTransfers and domainRenewals
        const transfers = result[1]
        const wrappedTransfers = result[2]
        const domainRenewals = result[3]

        // Create expiry date
        const expiryDate = [{
            date: result[0].expiryDate,
            eventType: 'domainExpiration'}]

        return [...createdAtData, ...transfers, ...wrappedTransfers, ...domainRenewals, ...expiryDate]
    })

    return data
}
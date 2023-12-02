import { namehash } from "ethers";
import { getDomainData } from "./domainData"
import { getDomainRenewals } from "./domainRenewal"
import { getTransfers } from "./transfers"
import { getWrappedTransfers } from "./wrappedTransfers"

export const retrieveData = async (ens: string) => {

  // Generate namehash
  const hash = namehash(ens)

  // Requests to be done
  const promises = [
    getDomainData(ens),
    getTransfers(hash),
    getWrappedTransfers(hash),
    getDomainRenewals(ens)
  ]

  const result = await Promise.all(promises)

  if (result[0][0] === undefined) return []

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
  const [, transfers, wrappedTransfers, domainRenewals] = result

  // Create expiry date
  const expiryDate = [{
    date: result[0].expiryDate,
    eventType: 'domainExpiration'
  }]

  const data = [...createdAtData, ...transfers, ...wrappedTransfers, ...domainRenewals, ...expiryDate]

  return data
}
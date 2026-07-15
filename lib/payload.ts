import 'server-only'

import config from '@payload-config'
import { getPayload } from 'payload'

/**
 * Returns Payload's internally cached server instance.
 * This module must never be imported from a Client Component.
 */
export const getPayloadClient = () => getPayload({ config })

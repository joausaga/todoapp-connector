export const LOW_PRIORITY = 'Low'
export const MEDIUM_PRIORITY = 'Medium'
export const HIGH_PRIORITY = 'High'

const statuses: string[] = [
    LOW_PRIORITY,
    MEDIUM_PRIORITY,
    HIGH_PRIORITY
]

export function getStatusByKey(statusKey: i32): string {
    return statuses[statusKey]
}

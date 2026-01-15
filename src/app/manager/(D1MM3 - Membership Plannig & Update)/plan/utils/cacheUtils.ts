/**
 * Utility function to invalidate the membership plans cache
 * Call this after creating, editing, or deleting a plan
*/
export function invalidatePlansCache() {
    const businessData = JSON.parse(localStorage.getItem("businessData") || "{}");
    const businessID = businessData?.ID;

    if (businessID) {
        const sessionKey = `plansFetched_${businessID}`;
        const cacheKey = `membershipPlans_${businessID}`;

        // Remove the session flag to force fresh API call
        sessionStorage.removeItem(sessionKey);

        // Optionally, also clear the localStorage cache
        localStorage.removeItem(cacheKey);

        console.log('✅ Plans cache invalidated - will fetch fresh data on next load');
    }
}

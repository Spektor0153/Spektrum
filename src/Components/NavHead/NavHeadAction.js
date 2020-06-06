export const MOBILE_ANALYSE = 'MOBILE_ANALYSE';

export const mobileAnalyse = (width) => {
    return {
        type: MOBILE_ANALYSE,
        payload: width
    }
}
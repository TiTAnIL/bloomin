export function spendBalance(amount) {
    return (dispatch) => {
        dispatch({ type: 'SPEND_BALANCE', amount })
    }
}
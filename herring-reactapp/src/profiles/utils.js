import React from 'react'
import numeral from 'numeral'

export function DisplayCount({className, children}) {
    return <span className={className}>{numeral(children).format('0a')}</span>
}

export default DisplayCount
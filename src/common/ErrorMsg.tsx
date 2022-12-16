import React, { useContext } from 'react'
import cx from 'classnames'

import Five11Ctx from '../ctx/511.ctx'

const ErrorMsg = () => {
  const { apiStatus } = useContext(Five11Ctx)

  const errorMsg =
    apiStatus === 429
      ? 'Too many request, wait an hour to try again'
      : apiStatus === 401
      ? 'Invalid 511 token'
      : 'Unknown issue'

  return (
    <aside id="error-msg" className={cx({ visible: apiStatus !== 200 })}>
      Error: {apiStatus} - {errorMsg}
    </aside>
  )
}

export default ErrorMsg

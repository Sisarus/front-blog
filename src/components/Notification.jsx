const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  const classColor = type === 'error' ? 'error' : 'success';

  return (
    <div className={classColor}>
      {message}
    </div>
  )
}

export default Notification
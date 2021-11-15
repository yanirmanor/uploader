import { useState } from 'react'
import { Button, message, Input } from 'antd'
export function Download () {
  const [imageName, setImageName] = useState('')
  const handleDownload = async e => {
    e.preventDefault()
    try {
      await fetch(`http://localhost:3001/user/download?img=${imageName}`, {
        responseType: 'blob'
      })
        .then(response => {
          if (response.status === 200) {
            return response.blob()
          } else {
            throw new Error('Error')
          }
        })
        .then(function (file) {
          console.log(file)
          let blob = new Blob([file], { type: 'dmp' })

          console.log(blob)
          // Create an object URL for the blob object
          const url = URL.createObjectURL(blob)

          console.log(url)

          // Create a new anchor element
          const a = document.createElement('a')

          a.href = url
          a.download = 'image.png' || 'download'
          a.click()
          setImageName('')
        })
    } catch (err) {
      console.log(err)
      message.error('Oops something get wrong')
    }
  }

  return (
    <form
      onSubmit={handleDownload}
      style={{ display: 'flex', margin: '0 auto', maxWidth: 500 }}
    >
      <Input
        id='imageName'
        value={imageName}
        onChange={e => setImageName(e.target.value)}
        placeholder='Please enter file name for download'
      />
      <Button htmlType='submit'>Download</Button>
    </form>
  )
}

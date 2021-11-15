import { useState, useEffect } from 'react'
import { Card, Button, Badge, message, Tabs, Input } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'
import { useDropzone } from 'react-dropzone'

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
}

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
}

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
}

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
}

export function Upload () {
  const [expiredTime, setExpiredTime] = useState('')
  const [files, setFiles] = useState([])
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      )
    }
  })

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
      <Badge
        style={{ position: 'absolute' }}
        count={<CloseCircleOutlined />}
        onClick={() => setFiles([])}
      />
    </div>
  ))

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

  const handleSubmit = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('expired', expiredTime)
    formData.append('photo', files[0])

    try {
      const res = await fetch('http://localhost:3001/user/upload', {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      if (res.status === 200) {
        setFiles([])
        setExpiredTime('')
        message.success({
          content: `Yeah :) ${data.fileName} upload successfully and copy automatically to clipboard`,
          duration: 1,
          onClose: () => {
            navigator.clipboard.writeText(data.fileName)
          }
        })
      }
    } catch (err) {
      console.log(err)
      message.error('Oops something get wrong')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card style={{ width: 300, margin: '0 auto' }}>
        <section className='container'>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          <aside style={thumbsContainer}>{thumbs}</aside>
          <Input
            disabled={files.length === 0}
            style={{ margin: 10 }}
            value={expiredTime}
            onChange={e => setExpiredTime(e.target.value)}
            id='expiredTime'
            placeholder='Please enter expired file for download'
          />
        </section>
        <Button type='primary' htmlType='submit' disabled={files.length === 0}>
          Upload
        </Button>
      </Card>
    </form>
  )
}

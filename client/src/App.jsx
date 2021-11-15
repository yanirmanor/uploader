import 'antd/dist/antd.css'
import './App.css'
import { Tabs } from 'antd'
import { Download } from './components/donwload'
import { Upload } from './components/upload'

const { TabPane } = Tabs

function App () {
  return (
    <div className='App'>
      <h1>Ephemeral File Sharing</h1>
      <Tabs defaultActiveKey='upload' centered style={{ margin: 10 }}>
        <TabPane tab='Upload' key='upload'>
          <Upload />
        </TabPane>
        <TabPane tab='Download' key='download'>
          <Download />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default App

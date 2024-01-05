import {
  Tabs,
  TabPane,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Select,
  Option,
  Form,
  FormItem,
  Table,
  TableColumn,
  Input,
  Button,
  Card,
  Dialog,
  Checkbox,
  Divider,
  CheckboxGroup,
  Upload,
  RadioGroup,
  RadioButton,
  Col,
  DatePicker,
  TimePicker,
  Switch,
  Radio,
  Message,
  Loading,
  Collapse,
  CollapseItem,
  Image,
  Row,
  Skeleton,
  SkeletonItem,
  Transfer,
  Tag,
  Pagination,
  Progress
} from 'element-ui'

const MyPlugin = {}

MyPlugin.install = function(Vue, options) {
  Vue.use(Tabs)
  Vue.use(TabPane)
  Vue.use(Container)
  Vue.use(Header)
  Vue.use(Aside)
  Vue.use(Main)
  Vue.use(Menu)
  Vue.use(Submenu)
  Vue.use(MenuItemGroup)
  Vue.use(MenuItem)
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Input)
  Vue.use(Button)
  Vue.use(Card)
  Vue.use(Dialog)
  Vue.use(Checkbox)
  Vue.use(Divider)
  Vue.use(CheckboxGroup)
  Vue.use(Upload)
  Vue.use(RadioGroup)
  Vue.use(RadioButton)
  Vue.use(Col)
  Vue.use(DatePicker)
  Vue.use(TimePicker)
  Vue.use(Switch)
  Vue.use(Radio)
  Vue.use(Collapse)
  Vue.use(CollapseItem)
  Vue.use(Image)
  Vue.use(Row)
  Vue.use(Skeleton)
  Vue.use(SkeletonItem)
  Vue.use(Transfer)
  Vue.use(Tag)
  Vue.use(Pagination)
  Vue.use(Progress)
  Vue.use(Loading.directive)

  Vue.prototype.$message = Message
  Vue.prototype.$loading = Loading.service
}

export default MyPlugin

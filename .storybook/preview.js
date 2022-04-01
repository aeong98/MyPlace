import '../styles/common.module.scss';
import '../styles/globals.scss';
import '../components/commons/common.module.scss';
import * as NextImage from "next/image";
import { Provider } from './Provider'

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story)=>(
    <Provider>
      <Story/>
    </Provider>
  )
]
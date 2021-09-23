# NEXT REDUX WRAPPER

Việc thiết lập Redux cho các ứng dụng tĩnh khá đơn giản: phải tạo một cửa hàng Redux duy nhất được cung cấp cho tất cả các trang.

Tuy nhiên, khi trình tạo trang SSG hoặc SSR trong nextjs, mọi thứ bắt đầu trở nên phức tạp vì cần có một phiên bản lưu trữ khác trên máy chủ để hiển thị các thành phần được kết nối với Redux.

Hơn nữa, cũng có thể cần quyền truy cập vào Redux Store trong getInitialProps của một trang.

Đây là lúc next-redux-wrapper có ích: Nó tự động tạo các phiên bản store cho bạn và đảm bảo tất cả chúng đều có cùng trạng thái.

Hơn nữa, nó cho phép xử lý đúng các trường hợp phức tạp như App.getInitialProps (khi sử dụng trang / \_app) cùng với getStaticProps hoặc getServerSideProps ở cấp độ trang riêng lẻ.

Thư viện cung cấp giao diện thống nhất cho dù bạn muốn sử dụng phương thức vòng đời Next.js nào trong Cửa hàng.

## USAGE

- Chú ý : trong reducer phải có action xử lý HYDRATE: Hydrate là quá trình chuyển trang JS thành trang HTML trước khi rendering

```

// store.ts

import {createStore, AnyAction, Store} from 'redux';
import {createWrapper, Context, HYDRATE} from 'next-redux-wrapper';

export interface State {
    tick: string;
}

// create your reducer
const reducer = (state: State = {tick: 'init'}, action: AnyAction) => {
    switch (action.type) {
        case HYDRATE:
            // Attention! This will overwrite client state! Real apps should use proper reconciliation.
            return {...state, ...action.payload};
        case 'TICK':
            return {...state, tick: action.payload};
        default:
            return state;
    }
};

// create a makeStore function
const makeStore = (context: Context) => createStore(reducer);

// export an assembled wrapper
export const wrapper = createWrapper<Store<State>>(makeStore, {debug: true});

```

- Cần bọc tất cả các trang vào một trong pages/\_app => để tránh hiện tượng race conditions có thể ko thể update component trong khi rendering another component. Chỉ cần bọc lại như bên dưới. nếu sử dụng getInitialProps trong này sẽ tắt cái tự động tối ưu hóa của nextjs

```

import React, {FC} from 'react';
import {AppProps} from 'next/app';
import {wrapper} from '../components/store';

const WrappedApp: FC<AppProps> = ({Component, pageProps}) => (
    <Component {...pageProps} />
);

export default wrapper.withRedux(WrappedApp);

```

- Cần bằng state trong quá trình hydration: Mỗi lần page gọi getStaticProps hay getServerSideProps, action HYDRATE sẽ được dispatched. Điều này xảy ra trong quá trình page khởi tạo và trong quá trình điều hướng trang

```
const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    if (state.count) nextState.count = state.count // preserve count value on client side navigation
    return nextState
  } else {
    return combinedReducer(state, action)
  }
}

```

- Configuration : createWrapper chấp nhận makeStore làm đối số đầu tiên. makeStore trả về một redux store trong mỗi lần gọi. Ko cần ghi nhớ ở đây, nó được tự động bao bọc trong wrapper

- Có thể wrapper trong pages/\_app, khi đó các tất cả các page chỉ cần kết nối không cần wrapper lại.

## HOW TO WORK

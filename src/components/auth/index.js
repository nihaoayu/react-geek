import { isAuth } from "@/utils/auth"
import { Route, Redirect } from "react-router-dom"

function AuthRoute ({ component: CurrComponent, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuth()) {
          return <Redirect to={
            {
              pathname: '/login',
              state: {
                // 上一个页面
                form: props.location.pathname
              }
            }
          } />
        }
        return <CurrComponent />
      }}
    />)
}

export default AuthRoute

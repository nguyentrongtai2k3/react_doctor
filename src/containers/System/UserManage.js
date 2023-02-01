import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers } from "../../services/userService";
import { Fragment } from "react";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayUsers: [],
    };
  }

  async componentDidMount() {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrayUsers: response.users,
      });
      console.log(this.state.arrayUsers);
    }
    console.log("get user data from nodejs : ", response);
  }

  render() {
    let arrayUsers = this.state.arrayUsers;
    return (
      <div className="users-container">
        <div className="title text-center">Manage users with Tai Trong</div>
        <div class="mask d-flex align-items-center h-100">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-12">
                <div class="card mask-custom">
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-borderless text-white mb-0">
                        <thead>
                          <tr>
                            <th scope="col">Email</th>
                            <th scope="col">FirstName</th>
                            <th scope="col">LastName</th>
                            <th scope="col">Address</th>
                            {/* <th scope="col">Action</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {arrayUsers &&
                            arrayUsers.map((item, index) => {
                              return (
                                <Fragment>
                                  <tr>
                                    <td scope="row">{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                      <button style={{ width: "100%" }}>
                                        <a href="edit-user-data">Edit</a>
                                      </button>
                                    </td>
                                    <td>
                                      <button style={{ width: "100%" }}>
                                        <a href="edit-user-data">Delete</a>
                                      </button>
                                    </td>
                                  </tr>
                                </Fragment>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

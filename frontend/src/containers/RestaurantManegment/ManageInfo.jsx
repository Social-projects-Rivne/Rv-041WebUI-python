import React from "react";
import UpdateRestaurantForm from "./UpdateRestaurantForm";
import { EditorState, RichUtils, convertFromRaw } from "draft-js";
import converter from "../../components/Markdown/Converter";

class ManageInfo extends React.Component {
  state = {};

  componentDidMount() {
    const restId = this.props.match.params.id;
    fetch(`http://localhost:6543/api/restaurant/${restId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      }
    })
      .then(response => {
        return response.status >= 200 && response.status < 300
          ? response.json()
          : response.json().then(Promise.reject.bind(Promise));
      })
      .then(rest => {
        if (rest.data[0].description_markup) {
          const markup = converter(
            convertFromRaw(JSON.parse(rest.data[0].description_markup))
          );
          this.setState({
            restMarkup: markup
          });
        }
        this.setState({
          restInfo: rest.data[0],
          ableUpdate: rest.is_owner
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return <UpdateRestaurantForm />;
  }
}

export default ManageInfo;

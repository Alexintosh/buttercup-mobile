import React, { Component } from "react";
import { Button, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { CellGroup, CellInput } from "react-native-cell-components";
import Spinner from "react-native-loading-spinner-overlay";
import { saveNewEntry } from "../shared/entry.js";

const styles = StyleSheet.create({
    container: {
        width: "100%"
    }
});

class NewEntryPage extends Component {
    static navigationOptions = {
        title: "New Entry",
        headerRight: <Button title="Create" onPress={saveNewEntry} />
    };

    componentWillUnmount() {
        this.props.onUnmount();
    }

    handleValueChange(key, value) {
        this.props.setPropertyValue(key, value);
    }

    render() {
        const boringProps = {
            autoCapitalize: "none",
            autoCorrect: false,
            spellCheck: false
        };
        return (
            <View style={styles.container}>
                <CellGroup>
                    <CellInput
                        key="title"
                        title="Title"
                        value={this.props.title}
                        onChangeText={text => this.handleValueChange("title", text)}
                    />
                    <CellInput
                        key="username"
                        title="Username"
                        value={this.props.username}
                        keyboardType="email-address"
                        onChangeText={text => this.handleValueChange("username", text)}
                        {...boringProps}
                    />
                    <CellInput
                        key="password"
                        title="Password"
                        value={this.props.password}
                        onChangeText={text => this.handleValueChange("password", text)}
                        {...boringProps}
                    />
                </CellGroup>
                <Spinner
                    visible={this.props.isSaving}
                    textContent="Saving"
                    textStyle={{ color: "#FFF" }}
                    overlayColor="rgba(0, 0, 0, 0.75)"
                />
            </View>
        );
    }
}

NewEntryPage.propTypes = {
    isSaving: PropTypes.bool.isRequired,
    onUnmount: PropTypes.func,
    password: PropTypes.string.isRequired,
    setPropertyValue: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
};

NewEntryPage.defaultProps = {
    onUnmount: () => {}
};

export default NewEntryPage;

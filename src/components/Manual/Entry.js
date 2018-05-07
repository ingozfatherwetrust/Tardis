import React, {Component} from 'react';
import {View, Text, Image, Linking} from 'react-native';
import ManualSection from "./ManualSection";
import ManualSubSection from "./ManualSubSection";

// export default class Entry extends Component<entry>{
const Entry = ({entry}) => {
    const { image, title, description} = entry;
    const{ thumbnailStyle, headerContentStyle, thumbnailContainerStyle, headerTextStyle, imageStyle} = styles;
    return (
        <ManualSection>
            <ManualSubSection>
                <View style={headerContentStyle}>
                    <Text style={headerTextStyle}>{title}</Text>
                </View>

            </ManualSubSection>

            <ManualSubSection>
                <Image
                    style={imageStyle}
                    source={{uri: image}}
                />
            </ManualSubSection>
            <ManualSubSection>
                <Text>{description}</Text>
            </ManualSubSection>

        </ManualSection>
    )
};
const styles = {
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    headerTextStyle: {
        fontSize: 18
    },
    thumbnailStyle: {
        height: 50,
        width: 50
    },
    thumbnailContainerStyle : {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    imageStyle: {
        height: 300,
        flex: 1,
        width: null
    }
};

export default Entry;
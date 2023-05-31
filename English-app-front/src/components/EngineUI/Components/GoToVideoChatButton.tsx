import {Button} from "@mantine/core";
import {AlertVariant} from "@mantine/core/lib/Alert/Alert.styles";
import i18n from "i18next";

export interface GoToVideoChatButtonData {
    iframeLink: string,
    textRu: string,
    textEn: string,
    color: string,
    onClick?: (linkToIframe: string) => void
}

function GoToVideoChatButton(prop: GoToVideoChatButtonData) {

    return (
        <>
            <Button color={prop.color ?? 'blue'} onClick={()=> {
                if (prop.onClick !== undefined) {
                    prop.onClick(prop.iframeLink)
                }
            }}>
                { i18n.language === "en" ? prop.textEn : prop.textRu}
            </Button>
        </>
    );
}

export default GoToVideoChatButton;

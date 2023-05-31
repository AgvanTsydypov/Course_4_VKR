import InfoBanner, {InfoBannerData} from "./Components/InfoBanner";
import GoToVideoChatButton, {GoToVideoChatButtonData} from "./Components/GoToVideoChatButton";

/**
 * Table of processed type
 * | Имя компонента | описание компонента | интерфейс, отражающий поля компонента |
 * | InfoBanner | информационный баннер | InfoBannerData |
 */
export interface EngineUIProp {
    type: string,
    data: any
}

function EngineUI(
    engineUIProp: EngineUIProp
) {

    return (
        <>
            {
                engineUIProp.type === "InfoBanner" &&
                <InfoBanner
                    variant={(engineUIProp.data as InfoBannerData).variant}
                    color={(engineUIProp.data as InfoBannerData).color}
                    descriptionEn={(engineUIProp.data as InfoBannerData).descriptionEn}
                    descriptionRu={(engineUIProp.data as InfoBannerData).descriptionRu}
                    titleEn={(engineUIProp.data as InfoBannerData).titleEn}
                    titleRu={(engineUIProp.data as InfoBannerData).titleRu}
                />
            }
            {
                engineUIProp.type === "GoToVideoChatButton" &&
                    <GoToVideoChatButton
                        iframeLink={(engineUIProp.data as GoToVideoChatButtonData).iframeLink}
                        textRu={(engineUIProp.data as GoToVideoChatButtonData).textRu}
                        textEn={(engineUIProp.data as GoToVideoChatButtonData).textEn}
                        color={(engineUIProp.data as GoToVideoChatButtonData).color}
                    />
            }
        </>
    );
}

export default EngineUI;

import { defineComponent, PropType } from "@vue/runtime-core";
import { Image, ImagePreviewGroup } from "ant-design-vue";
import { materialImageRequestProps } from "api/warehouse/material";
import emptyImage from "assets/icon_empty_search.png";

export default defineComponent({
  name: "Images",
  props: {
    columns: {
      type: Object as PropType<materialImageRequestProps[]>,
      required: true,
    },
    size: {
      type: Number,
      requried: false,
      default: 88,
    },
  },
  setup(props) {
    return () => (
      <div>
        <ImagePreviewGroup>
          {props.columns?.map(
            (image: materialImageRequestProps, key: number) => {
              return (
                <div v-show={!key}>
                  <Image
                    class="w-full h-full object-cover rounded"
                    src={image.fileUrl || emptyImage}
                    fallback={emptyImage}
                    width={props.size}
                    height={props.size}
                  ></Image>
                </div>
              );
            }
          )}
        </ImagePreviewGroup>
      </div>
    );
  },
});

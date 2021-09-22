<template>
	<div>
		<v-group :config="group" @tap="handleMouseDown" @click="handleMouseDown" @mouseover="handleMouseOver"
			@mouseout="handleMouseOut" v-if="!isdiy">
			<v-rect :config="react"></v-rect>
			<v-image :config="img" ref='rect'></v-image>
			<v-text :config="text"></v-text>
		</v-group>

	</div>
</template>

<script>

	export default {
		name: 'react',
		props: {
			config: {
				type: Object,
				default: {}
			},
			txt: {
				type: String,
				default: ''
			},
			isdiy: {
				type: Boolean,
				default: false
			},
			skewX: {
				type: Number,
				default: 10
			},
			skewY: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				group: {
					x: 0,
					y: 0,
					width: 50,
					height: 82,
				},
				react: {
					//filters: [Konva.Filters.Blur],
					width: 50,
					height: 82,
					offsetX: 0,
					offsetY: 0,
					fill: 'rgba(24, 144, 255, 0.5)',
					stroke: '#FFFFFF',
					strokeWidth: 1,
				},
				img: {
					//filters: [Konva.Filters.Blur],
					image: '',
					opacity: 0,
					globalCompositeOperation: ''
				},

				text: {
					x: 0,
					y: 0,
					text: '',
					fontSize: 18,
					align: 'center',
					fill: '#fff',
					width: 0,
					offsetY: 0
				}
			};
		},
		computed: {

		},
		mounted() {
			this.$nextTick(() => {
				const image = new Image();
				let imgUrl = '../../../../../assets/img_warehouse_normal.png'
				let file = import.meta.globEager('../../../../../assets/*.png')
				image.src = file[imgUrl].default;
		
				image.onload = () => {
					// set image only when it is loaded
					this.img.image = image;
				};

				Object.assign(this.group, this.config);
				Object.assign(this.react, this.config);
				Object.assign(this.img, this.config);

				this.react.x = 0
				this.react.y = 0
				delete this.react.rotation
				delete this.img.rotation

				this.img.x = 0
				this.img.y = 0

				this.text.text = this.txt
				this.text.width = this.react.width
				this.text.y = this.react.height / 2 - 9
			})



		},
		methods: {
			handleMouseDown(type) {
				this.img.globalCompositeOperation = 'hard-light'
				this.img.opacity = this.img.opacity ? 0 : 1;
				if (type === 'legend') return
        this.toRackPage()
			},
			handleMouseOver(evt) {
				this.img.globalCompositeOperation = 'hard-light'
				this.img.opacity = 1;
			},
			handleMouseOut() {
				this.img.globalCompositeOperation = ''
				this.img.opacity = 0;
			},
      toRackPage () {
        this.$router.push({ name: 'Rack', params: { id: this.txt } })
      }
		}
	}
</script>


<style scoped>

</style>

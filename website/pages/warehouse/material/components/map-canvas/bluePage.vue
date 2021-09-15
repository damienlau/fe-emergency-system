<template>
	<div>
		<v-group :config="group" @tap="handleMouseDown" @click="handleMouseDown" @mouseover="handleMouseOver"
			@mouseout="handleMouseOut" v-if="!isdiy">
			<v-rect :config="react"></v-rect>
			<v-image :config="img"></v-image>
			<v-text :config="text"></v-text>
		</v-group>
		<v-group :config="group" @tap="handleMouseDown" @click="handleMouseDown" @mouseover="handleMouseOver"
			@mouseout="handleMouseOut" v-else>
			<v-rect :config="diyconfig"></v-rect>
			<v-image :config="lightShape"></v-image>
			<v-text :config="text"></v-text>
		</v-group>
	</div>
</template>

<script>

	export default {
		name: 'blue',
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
				lightShape: {
					x: 0,
					y: 0,
					image: '',
					opacity: 0,
					globalCompositeOperation: ''
				},
				diyconfig: {

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
				
				let file = import.meta.globEager('../../../../../assets/*.png')
				const image = new Image();
				let imgUrl = '../../../../../assets/img_warehouse_normal.png'
				image.src = file[imgUrl].default;
				image.onload = () => {
					// set image only when it is loaded
					this.img.image = image;
				};
				if (this.txt == 33) {
					const image33 = new Image();
					let imgUrl33 = '../../../../../assets/img_warehouse_33.png'
					image33.src = file[imgUrl33].default; 
					image33.onload = () => {
						// set image only when it is loaded
						this.lightShape.image = image33;
					};
				}
				if (this.txt == 34) {
					const image34 = new Image();
					let imgUrl34 = '../../../../../assets/img_warehouse_34.png'
					image34.src = file[imgUrl34].default; 
					image34.onload = () => {
						// set image only when it is loaded
						this.lightShape.image = image34;
					};
				}

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

				if (this.isdiy) {
					let config = this.config
					let that = this
					this.diyconfig = {
						sceneFunc: function(context, shape) {
							context.beginPath();
							context.moveTo(that.skewX, 0); //moveTo()起始位置
							context.lineTo(config.width - that.skewY, 0); //lineTo()路径位置
							context.lineTo(config.width, config.height);
							context.lineTo(0, config.height);
							context.closePath();
							context.fillStrokeShape(shape);
						},
						fill: '#0F64B5',
						stroke: '#fff',
						strokeWidth: 1
					}
				}
			})

		},
		methods: {
			handleMouseDown(evt) {
				this.img.globalCompositeOperation = 'hard-light'
				this.img.opacity = this.img.opacity ? 0 : 1;
				this.lightShape.globalCompositeOperation = 'hard-light'
				this.lightShape.opacity = this.lightShape.opacity ? 0 : 1;
				this.diyconfig.fill = this.diyconfig.fill == "#1890FF" ? "#0F64B5" : "#1890FF";
				this.react.fill = this.react.fill == "#1890FF" ? "#0F64B5" : "#1890FF";
        this.toRackPage()
			},
			handleMouseOver(evt) {
				this.img.globalCompositeOperation = 'hard-light'
				this.img.opacity = 1;
				this.lightShape.globalCompositeOperation = 'hard-light'
				this.lightShape.opacity = 1;
				this.react.fill = "#1890FF"
				this.diyconfig.fill = "#1890FF"
			},
			handleMouseOut() {
				this.img.globalCompositeOperation = ''
				this.img.opacity = 0;
				this.lightShape.globalCompositeOperation = ''
				this.lightShape.opacity = 0;
				this.react.fill = "#0F64B5"
				this.diyconfig.fill = "#0F64B5"
			},
      toRackPage () {
        this.$router.push({ name: 'Rack', params: { id: this.txt } })
      }
		}
	}
</script>


<style scoped>

</style>

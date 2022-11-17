<template>
	<view class="u-page">
		<u-navbar bgColor="#f7f7f7" placeholder leftIcon="" leftText="穿搭">
			<view class="u-nav-slot" slot="right" >
				<u-icon name="plus-circle" size="25" @click="add"></u-icon>
			</view>
		</u-navbar>	
		
		
		<u-grid :border="false" col="3">
			<u-grid-item
				class="u-page__grid__item"
				v-for="(baseListItem,baseListIndex) in goodsList"
				:key="baseListIndex"
				@click="detail"
			>
				<view>
					<u--image class="u-margin" :showLoading="true"  :src="baseListItem.images[0]" width="200rpx" height="200rpx" radius="4" ></u--image>
				</view>
				<u--text :lines="1" :bold="true" align="center" size="14" lineHeight="30" :text="baseListItem.name"></u--text>
			</u-grid-item>
		</u-grid>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsList: [
					{
						images:[
							"https://wx3.sinaimg.cn/mw1024/0061JaDbgy1h7vs3sk0bij32c03401kz.jpg"
						],
						name:"衣服测试",
						surplus_day:1
					},
					{
						images:[
							"https://wx3.sinaimg.cn/mw1024/0061JaDbgy1h7vs3sk0bij32c03401kz.jpg"
						],
						name:"衣服测试",
						surplus_day:1
					},
					{
						images:[
							"https://wx3.sinaimg.cn/mw1024/0061JaDbgy1h7vs3sk0bij32c03401kz.jpg"
						],
						name:"衣服测试",
						surplus_day:1
					},
					{
						images:[
							"https://wx3.sinaimg.cn/mw1024/0061JaDbgy1h7vs3sk0bij32c03401kz.jpg"
						],
						name:"衣服测试",
						surplus_day:1
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			add(){
				uni.$u.route({
					url: '/pages/add/add'
				})
			},
		}
	}
</script>


<style lang="scss">
	.u-page {
	
		&__grid{
			&__item{
				margin: 20rpx 0rpx 0rpx;
			}
			
		}
		
	}	
	
</style>


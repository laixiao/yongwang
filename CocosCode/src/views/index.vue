<style scoped>
	.layout {
		border: 1px solid #d7dde4;
		background: #f5f7f9;
		position: relative;
		border-radius: 4px;
		overflow: hidden;
	}

	.Menu {
		background: black;
		display: flex;
		justify-content: space-between;
	}

	.layout-logo {
		position: relative;
		float: left;
		left: 0px;
		height: 90%;
	}

	.layout-nav {
		margin: 0 auto;
		margin-right: 20px;
	}

	.sider-left {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.sider-search {
		width: 150px;
		height: 30px;
		background: #5b6270;
		border-radius: 3px;
		color: white;
		margin: 10px 0 10px 25px;
	}

	.topbar {
		display: flex;
		width: 100%;
		height: 70px;
		justify-content: space-between;
		align-items: center;
	}

	.topbar_tab1 {
		margin-left: 15px;
	}

	.topbar_tab2 {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.topbar_tab2_qr {
		width: 350px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.content {
		padding: '4px';
		minHeight: '280px';
		background: '#fff';
		display: flex;
		justify-content: space-between;
	}

	.content_d1 {
		flex-grow: 1;
	}

	.content_d2 {
		flex-grow: 0;
		position: relative;
	}

	.content_d2_img {
		width: 328px;
		height: 664px;
		margin-right: 10px;
	}

	.preview {
		background-image: url(../images/phone16.png);
		background-size: 100%;
		display: flex;
		justify-content: center;
	}

	.iframe {
		position: absolute;
		left: 16px;
		top: 75px;
		width: 295px;
		height: 510px;
	}

	.download-bt {
		position: absolute;
		left: 146px;
		bottom: 32px;
	}
</style>
<template>
	<div class="layout">
		<Layout>
			<Header style="background: black;">
				<Menu mode="horizontal" theme="dark" class="Menu" active-name="1">
					<img id="qrcode_img" src="../images/logo.png" class="layout-logo" />
					<div class="layout-nav">
						<MenuItem name="1">
						<Icon type="ios-cloud-upload" /> 贡献代码片
						</MenuItem>
						<MenuItem name="2">
						<Icon type="ios-book" /> 极简API
						</MenuItem>
						<MenuItem name="3">
						<Icon type="logo-github" /> Github
						</MenuItem>
						<MenuItem name="4">
						<Icon type="ios-heart" /> 支持
						</MenuItem>
					</div>
				</Menu>
			</Header>
			<Layout>
				<!-- 左边列表 -->
				<Sider hide-trigger :style="{background: '#fff'}" class="sider-left">
					<Menu theme="light" width="200px" @on-select="clickItem" :open-names="['0']" active-name="0-0">
						<Input search placeholder="输入关键字" class="sider-search" />
						<Submenu v-for="(item, index) in codeArry" :name="item.name">
							<template slot="title">
								<Icon :type="item.icon"></Icon>
								{{item.title}}
							</template>
							<MenuItem v-for="(item2, index2) in item.items" :name="item2.name">{{item2.title}}</MenuItem>
						</Submenu>
					</Menu>
				</Sider>
				<Layout :style="{padding: '0 0px 10px'}">
					<div class="topbar">
						<Breadcrumb class="topbar_tab1">
							<BreadcrumbItem to="/">
								<Icon :type="codeArry[i0].icon"></Icon> {{codeArry[i0].title}}</BreadcrumbItem>
							<BreadcrumbItem> {{codeArry[i0].items[i1].title}}</BreadcrumbItem>
						</Breadcrumb>
						<div class="topbar_tab2">
							<Button type="primary" shape="circle" icon="md-refresh" style="margin-right: 20px;" @click="reset">重置</Button>
							<Button type="primary" shape="circle" icon="md-copy" v-clipboard:success="onCopy" v-clipboard:error="onError" v-clipboard:copy="codeArry[i0].items[i1].code">一键复制</Button>
							<div class="topbar_tab2_qr">
								<Button type="dashed" @click="preview_bt">
									<Icon type="md-qr-scanner" /> 预览二维码</Button>
							</div>
						</div>
					</div>

					<Content class="content">
						<!-- 中部代码区域 -->
						<div class="content_d1">
							<MonacoEditor height="600" language="typescript" theme="vs" :code="codeArry[i0].items[i1].code" :editorOptions="options"
							    @mounted="onMounted" @codeChange="onCodeChange">
							</MonacoEditor>
						</div>
						<div class="content_d2">
							<img class="content_d2_img" src="../images/phone16.png" />
							<iframe class="iframe" :src="codeArry[i0].items[i1].gameurl"></iframe>
							<Button class="download-bt" size="large" icon="ios-download-outline" type="info" shape="circle" @click="downloadbt"></Button>
						</div>
					</Content>
				</Layout>

			</Layout>
		</Layout>
	</div>
</template>
<script>
	import MonacoEditor from 'vue-monaco-editor';
	import QRCode from 'qrcode';
	import VueClipboard from 'vue-clipboard2';

	export default {
		components: {
			MonacoEditor,VueClipboard
		},
		data() {
			return {
				options: {
					selectOnLineNumbers: false
				},
				i0: 0,
				i1: 0,
				codeArry: [{
						name: '0',
						title: '开始',
						icon: 'ios-navigate',
						items: [{
								name: '0-0',
								title: 'RichText',
								code: [
									'function x() {',
									'\tconsole.log("Hello!1111111111111111");',
									'}'
								].join('\n'),
								gameurl: '../../games/RichText/web-mobile/index.html',
							},
							{
								name: '0-1',
								title: 'Action',
								code: [
									'function x() {',
									'\tconsole.log("Hello 2222222222222!");',
									'}'
								].join('\n'),
								gameurl: '../../games/Action/web-mobile/index.html',
							},
						]
					},
					{
						name: '1',
						title: '微信小游戏',
						icon: 'ios-navigate',
						items: [{
								name: '1-0',
								title: 'Toast',
								code: [
									'function x() {',
									'\tconsole.log("Hello 33333333333!");',
									'}'
								].join('\n'),
								gameurl: '../../games/RichText/web-mobile/index.html',
							},
							{
								name: '1-1',
								title: 'Action',
								code: [
									'function x() {',
									'\tconsole.log("Hello 444444444444444!");',
									'}'
								].join('\n'),
								gameurl: '../../games/Action/web-mobile/index.html',
							},
						]
					}
				],

			}
		},
		methods: {
			onMounted(editor) {
				this.editor = editor;
			},
			onCodeChange(editor) {
				// console.log(this.editor.getValue());
			},
			clickItem(e) {
				var arry = e.split('-');
				this.i0 = parseInt(arry[0]);
				this.i1 = parseInt(arry[1])
				this.editor.setValue(this.codeArry[this.i0].items[this.i1].code)
				// console.log("=========", e);
			},
			reset() {
					this.editor.setValue(this.codeArry[this.i0].items[this.i1].code)
					this.$Message.success('重置成功');
			},
			downloadbt() {
// 			window.location.href = "https://github.com/laixiao/yongwang";
// 				this.$Notice.success({
// 						title: '源码放在github仓库,路径为:',
// 						desc: 'yongwang/CocosCode/games'
// 				});
					
			},
			preview_bt(){
					this.$Message.warning('开发中...');
			},
			onCopy: function (e) {
					this.$Message.success('复制成功');
			},
			onError: function (e) {
					this.$Message.error('复制失败,请刷新重试');
			}
			

		}
	}
</script>

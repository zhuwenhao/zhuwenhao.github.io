import{_ as n,r as d,o as i,c,e as l,a,d as e,b as r,f as o}from"./app-4529d39d.js";const t={},u=a("h1",{id:"caddy",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#caddy","aria-hidden":"true"},"#"),e(" Caddy")],-1),p=a("h2",{id:"下载",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#下载","aria-hidden":"true"},"#"),e(" 下载")],-1),v={href:"https://caddyserver.com/download",target:"_blank",rel:"noopener noreferrer"},m=a("code",null,"http.handlers.webhook",-1),b=o(`<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><p>移动下载的二进制文件到 <code>/usr/bin/</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">mv</span> caddy_linux_amd64_custom /usr/bin/caddy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改 <code>caddy</code> 权限</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">chmod</span> <span class="token number">755</span> /usr/bin/caddy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>测试是否有效</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ caddy version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建一个名为 <code>caddy</code> 的组</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">groupadd</span> <span class="token parameter variable">--system</span> caddy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建一个名为 <code>caddy</code> 且有可写的主目录的用户</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">useradd</span> <span class="token parameter variable">--system</span> <span class="token punctuation">\\</span>
    <span class="token parameter variable">--gid</span> caddy <span class="token punctuation">\\</span>
    --create-home <span class="token punctuation">\\</span>
    --home-dir /var/lib/caddy <span class="token punctuation">\\</span>
    <span class="token parameter variable">--shell</span> /usr/sbin/nologin <span class="token punctuation">\\</span>
    <span class="token parameter variable">--comment</span> <span class="token string">&quot;Caddy web server&quot;</span> <span class="token punctuation">\\</span>
    caddy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h2><p>创建一个名为 <code>foobar.com</code> 的站点目录</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token parameter variable">-m</span> <span class="token number">777</span> /var/www/foobar.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建一个名为 <code>Caddyfile</code> 的配置文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">mkdir</span> /etc/caddy
$ <span class="token function">sudo</span> <span class="token function">touch</span> /etc/caddy/Caddyfile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件内容</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>foobar.com, www.foobar.com {
  root * /var/www/foobar.com
  file_server

  encode zstd gzip

  route /webhook {
    webhook {
      repo https://github.com/foo/bar.git
      path /var/www/foobar.com
      branch pages
      secret xxx
    }
  }

  route {
    try_files {path} /index.html
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>xxx</code> 为远程仓库设置中 Webhook 的 Secret</p><h2 id="服务" tabindex="-1"><a class="header-anchor" href="#服务" aria-hidden="true">#</a> 服务</h2><p>将服务文件下载到 <code>/etc/systemd/system</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">wget</span> <span class="token parameter variable">-P</span> /etc/systemd/system https://raw.githubusercontent.com/caddyserver/dist/master/init/caddy.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>启用 <code>caddy</code> 服务</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> systemctl daemon-reload
$ <span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> <span class="token parameter variable">--now</span> caddy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>检查是否在运行中</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ systemctl status caddy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="日志" tabindex="-1"><a class="header-anchor" href="#日志" aria-hidden="true">#</a> 日志</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> journalctl <span class="token parameter variable">-u</span> caddy <span class="token parameter variable">-f</span> <span class="token parameter variable">-o</span> json-pretty
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,28);function h(g,k){const s=d("ExternalLinkIcon");return i(),c("div",null,[u,l(" more "),p,a("p",null,[e("打开 "),a("a",v,[e("下载"),r(s)]),e(" 页面，选择对应的平台，点选 "),m,e(" 模块，然后点击下载按钮")]),b])}const y=n(t,[["render",h],["__file","caddy.html.vue"]]);export{y as default};

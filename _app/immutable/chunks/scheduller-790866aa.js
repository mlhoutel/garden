import{S as f,i as g,s as b,k as u,q as S,a as F,l as k,m as l,r as T,h as o,c as R,n as i,b as r,E as w,B as _}from"./index-46686b93.js";function I(y){let s,t,e,c,a,h=`<code class="language-js"><span class="token keyword">const</span> Status <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">freeze</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
    <span class="token literal-property property">Waiting</span><span class="token operator">:</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token literal-property property">Running</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token literal-property property">Terminated</span><span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Task</span> <span class="token punctuation">&#123;</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">duration<span class="token punctuation">,</span> priority <span class="token operator">=</span> <span class="token number">1</span></span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>_duration <span class="token operator">=</span> duration
        <span class="token keyword">this</span><span class="token punctuation">.</span>_priority <span class="token operator">=</span> priority
        <span class="token keyword">this</span><span class="token punctuation">.</span>_status <span class="token operator">=</span> Status<span class="token punctuation">.</span>Waiting
        <span class="token keyword">this</span><span class="token punctuation">.</span>trace <span class="token operator">=</span> <span class="token string">""</span>
    <span class="token punctuation">&#125;</span>

    <span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> waiting <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_status <span class="token operator">===</span> Status<span class="token punctuation">.</span>Waiting
        <span class="token keyword">if</span> <span class="token punctuation">(</span>waiting<span class="token punctuation">)</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_status <span class="token operator">=</span> Status<span class="token punctuation">.</span>Running
    <span class="token punctuation">&#125;</span>

    <span class="token function">Stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> running <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_status <span class="token operator">===</span> Status<span class="token punctuation">.</span>Running
        <span class="token keyword">if</span> <span class="token punctuation">(</span>running<span class="token punctuation">)</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_status <span class="token operator">=</span> Status<span class="token punctuation">.</span>Waiting
    <span class="token punctuation">&#125;</span>

    <span class="token function">Step</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> running <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_status <span class="token operator">===</span> Status<span class="token punctuation">.</span>Running
        <span class="token keyword">this</span><span class="token punctuation">.</span>trace <span class="token operator">+=</span> running <span class="token operator">?</span> <span class="token string">"█"</span> <span class="token operator">:</span> <span class="token string">" "</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>running<span class="token punctuation">)</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_duration<span class="token operator">--</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_duration <span class="token operator">&lt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_status <span class="token operator">=</span> Status<span class="token punctuation">.</span>Terminated
    <span class="token punctuation">&#125;</span>

    <span class="token function">Terminated</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_status <span class="token operator">===</span> Status<span class="token punctuation">.</span>Terminated
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">const</span> Policy <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">freeze</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
    <span class="token constant">FIFO</span><span class="token operator">:</span> <span class="token string">"FIFO"</span><span class="token punctuation">,</span>    <span class="token comment">// First In First Out</span>
    <span class="token constant">LIFO</span><span class="token operator">:</span> <span class="token string">"LIFO"</span><span class="token punctuation">,</span>    <span class="token comment">// Last In First Out</span>
    <span class="token constant">SJF</span><span class="token operator">:</span> <span class="token string">"SJF"</span><span class="token punctuation">,</span>     <span class="token comment">// Shortest Job First</span>
    <span class="token constant">RR</span><span class="token operator">:</span> <span class="token string">"RR"</span><span class="token punctuation">,</span>      <span class="token comment">// Round Robin</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Preemptive scheduler</span>
<span class="token keyword">class</span> <span class="token class-name">Scheduler</span> <span class="token punctuation">&#123;</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">tasks<span class="token punctuation">,</span> policy<span class="token punctuation">,</span> threads <span class="token operator">=</span> <span class="token number">1</span></span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        tasks<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">t<span class="token punctuation">,</span> i</span><span class="token punctuation">)</span> <span class="token operator">=></span> t<span class="token punctuation">.</span>id <span class="token operator">=</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">this</span><span class="token punctuation">.</span>_policy <span class="token operator">=</span> policy
        <span class="token keyword">this</span><span class="token punctuation">.</span>_threads <span class="token operator">=</span> threads
        <span class="token keyword">this</span><span class="token punctuation">.</span>_queue <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span>tasks<span class="token punctuation">]</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>_pool <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>_complete <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">&#125;</span>

    <span class="token function">Schedule</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token comment">// Extract finished tasks</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">in</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_pool<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_pool<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">Terminated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                <span class="token keyword">const</span> task <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_pool<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>_complete<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token operator">...</span>task<span class="token punctuation">)</span>
            <span class="token punctuation">&#125;</span>
        <span class="token punctuation">&#125;</span>

        <span class="token keyword">switch</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_policy<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">case</span> Policy<span class="token punctuation">.</span><span class="token constant">FIFO</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
                <span class="token comment">// Insert tasks from the start</span>
                <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_queue<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_pool<span class="token punctuation">.</span>length <span class="token operator">&lt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_threads<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                    <span class="token keyword">const</span> task <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_queue<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    task<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span>_pool<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>task<span class="token punctuation">)</span>
                <span class="token punctuation">&#125;</span>
            <span class="token punctuation">&#125;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> Policy<span class="token punctuation">.</span><span class="token constant">LIFO</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
                <span class="token comment">// Insert tasks from the end</span>
                <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_queue<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_pool<span class="token punctuation">.</span>length <span class="token operator">&lt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_threads<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                    <span class="token keyword">const</span> task <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_queue<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    task<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span>_pool<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>task<span class="token punctuation">)</span>
                <span class="token punctuation">&#125;</span>
            <span class="token punctuation">&#125;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> Policy<span class="token punctuation">.</span><span class="token constant">SJF</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
                <span class="token comment">// Insert tasks from shortest</span>
                <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_queue<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_pool<span class="token punctuation">.</span>length <span class="token operator">&lt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_threads<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                    <span class="token keyword">const</span> task <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_queue<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=></span> a<span class="token punctuation">.</span>_duration <span class="token operator">-</span> b<span class="token punctuation">.</span>_duration<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    task<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span>_pool<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>task<span class="token punctuation">)</span>
                <span class="token punctuation">&#125;</span>
            <span class="token punctuation">&#125;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> Policy<span class="token punctuation">.</span><span class="token constant">RR</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
                <span class="token comment">// Stop running tasks and move them at the end</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">in</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_pool<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                    <span class="token keyword">const</span> task <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_pool<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    task<span class="token punctuation">.</span><span class="token function">Stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span>_queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>task<span class="token punctuation">)</span>
                <span class="token punctuation">&#125;</span>

                <span class="token comment">// Insert tasks from the start</span>
                <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_queue<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_pool<span class="token punctuation">.</span>length <span class="token operator">&lt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_threads<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                    <span class="token keyword">const</span> task <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_queue<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    task<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span>_pool<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>task<span class="token punctuation">)</span>
                <span class="token punctuation">&#125;</span>
            <span class="token punctuation">&#125;</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">default</span><span class="token operator">:</span> <span class="token keyword">throw</span> <span class="token string">"Policy not supported"</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token function">Trace</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>

        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_queue<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">||</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_pool<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">Schedule</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

            <span class="token keyword">const</span> every <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token keyword">this</span><span class="token punctuation">.</span>_queue<span class="token punctuation">,</span> <span class="token operator">...</span><span class="token keyword">this</span><span class="token punctuation">.</span>_pool<span class="token punctuation">,</span> <span class="token operator">...</span><span class="token keyword">this</span><span class="token punctuation">.</span>_complete<span class="token punctuation">]</span>
            every<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">t</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
                t<span class="token punctuation">.</span><span class="token function">Step</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>

        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">&#92;n________________ </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span><span class="token keyword">this</span><span class="token punctuation">.</span>_policy<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string"> [</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span><span class="token keyword">this</span><span class="token punctuation">.</span>_threads<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string"> threads] ________________&#92;n</span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span>

        <span class="token keyword">this</span><span class="token punctuation">.</span>_complete
            <span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=></span> a<span class="token punctuation">.</span>id <span class="token operator">-</span> b<span class="token punctuation">.</span>id<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">t</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">task </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>t<span class="token punctuation">.</span>id<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>t<span class="token punctuation">.</span>trace<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span>
            <span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">const</span> <span class="token constant">FIFO</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scheduler</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">Task</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Task</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Task</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Task</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span> Policy<span class="token punctuation">.</span><span class="token constant">FIFO</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token constant">LIFO</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scheduler</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">Task</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Task</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Task</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Task</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span> Policy<span class="token punctuation">.</span><span class="token constant">LIFO</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token constant">SJF</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scheduler</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">Task</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Task</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Task</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Task</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span> Policy<span class="token punctuation">.</span><span class="token constant">SJF</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token constant">RR</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scheduler</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">Task</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Task</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Task</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Task</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span> Policy<span class="token punctuation">.</span><span class="token constant">RR</span><span class="token punctuation">)</span>

<span class="token constant">FIFO</span><span class="token punctuation">.</span><span class="token function">Trace</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token constant">LIFO</span><span class="token punctuation">.</span><span class="token function">Trace</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token constant">SJF</span><span class="token punctuation">.</span><span class="token function">Trace</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token constant">RR</span><span class="token punctuation">.</span><span class="token function">Trace</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">/*
________________ FIFO [1 threads] ________________

task 0: ██████████                       
task 1:           █████                  
task 2:                ██████████        
task 3:                          ███████ 

________________ LIFO [1 threads] ________________

task 0:                       ██████████ 
task 1:                  █████           
task 2:        ██████████                
task 3: ███████                          

________________ SJF [1 threads] ________________

task 0:             ██████████           
task 1: █████                            
task 2:                       ██████████ 
task 3:      ███████                     

________________ RR [1 threads] ________________

task 0: █   █   █   █   █   █  █  █ █ █  
task 1:  █   █   █   █   █               
task 2:   █   █   █   █   █  █  █  █ █ █ 
task 3:    █   █   █   █   █  █  █       
*/</span></code>`;return{c(){s=u("h2"),t=u("a"),e=S("Scheduler demo"),c=F(),a=u("pre"),this.h()},l(n){s=k(n,"H2",{id:!0});var p=l(s);t=k(p,"A",{href:!0});var d=l(t);e=T(d,"Scheduler demo"),d.forEach(o),p.forEach(o),c=R(n),a=k(n,"PRE",{class:!0});var m=l(a);m.forEach(o),this.h()},h(){i(t,"href","#scheduler-demo"),i(s,"id","scheduler-demo"),i(a,"class","language-js")},m(n,p){r(n,s,p),w(s,t),w(t,e),r(n,c,p),r(n,a,p),a.innerHTML=h},p:_,i:_,o:_,d(n){n&&o(s),n&&o(c),n&&o(a)}}}const q={title:"Scheduler",short:"Simple scheduler policies demo",topic:"scheduler visualisation"};class P extends f{constructor(s){super(),g(this,s,null,I,b,{})}}export{P as default,q as metadata};
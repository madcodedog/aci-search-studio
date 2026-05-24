const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const peasExamples = {
  medical: {
    Performance: "Healthy patient, fewer unnecessary tests, lower cost, fewer harmful diagnoses.",
    Environment: "Patient, symptoms, hospital systems, staff, lab reports, clinical constraints.",
    Actuators: "Questions, test requests, diagnosis suggestions, treatment/referral recommendations.",
    Sensors: "Patient answers, entered symptoms, findings, images, lab values, history records.",
    labels: ["partially observable", "stochastic", "sequential", "dynamic", "continuous", "multi-agent"]
  },
  robot: {
    Performance: "Percentage of parts placed in correct bins, speed, safety, damage avoidance.",
    Environment: "Conveyor belt, parts, bins, lighting, nearby workers, robot workspace.",
    Actuators: "Jointed arm, gripper, conveyor controls, alerts.",
    Sensors: "Camera, depth sensor, joint-angle sensors, force sensor.",
    labels: ["partially observable", "deterministic-ish", "sequential", "dynamic", "continuous", "single-agent"]
  },
  taxi: {
    Performance: "Safe arrival, short route, low fuel or charging cost, legal and comfortable driving.",
    Environment: "Roads, traffic, passengers, pedestrians, signals, maps, weather.",
    Actuators: "Steering, accelerator, brakes, indicators, display, horn.",
    Sensors: "Cameras, lidar, GPS, speedometer, map data, passenger input.",
    labels: ["partially observable", "stochastic", "sequential", "dynamic", "continuous", "multi-agent"]
  },
  vacuum: {
    Performance: "Clean squares, low energy, low time, no collisions.",
    Environment: "Rooms, dirt, walls, charging point.",
    Actuators: "Move left/right, suck dirt, stop, dock.",
    Sensors: "Location, dirt sensor, bump sensor, battery level.",
    labels: ["partially observable", "deterministic", "sequential", "static", "discrete", "single-agent"]
  }
};

function renderPeas() {
  const selected = $("#peasSelect").value;
  const example = peasExamples[selected];
  $("#peasGrid").innerHTML = Object.entries(example)
    .filter(([key]) => key !== "labels")
    .map(([key, value]) => `<div class="peas-card"><strong>${key}</strong><span>${value}</span></div>`)
    .join("");
  $("#environmentPills").innerHTML = example.labels
    .map((label, index) => `<span class="pill ${index % 2 === 0 ? "good" : ""}">${label}</span>`)
    .join("");
}

$("#peasSelect").addEventListener("change", renderPeas);
renderPeas();

const lectureNotes = {
  cs1: {
    meta: "CS1 transcript + CS1 slides",
    title: "CS1: Introduction to ACI and AI Foundations",
    body: `
      <div class="lecture-note-grid">
        <div class="lecture-note">
          <h4>1. Course framing</h4>
          <p>The teacher began by placing AIMLCZG557 as a core AI course. The important message was that slides are not exhaustive; they are a guided classroom path. The main textbook named in class is Russell and Norvig, Artificial Intelligence: A Modern Approach, 4th edition.</p>
          <ul>
            <li>The course moves from AI foundations to agents, search, logic, uncertainty, learning, and optimization.</li>
            <li>The handout matters because lectures, labs, quizzes, assignments, and readings follow it.</li>
            <li>For this first module, the focus is not coding first; it is learning how AI problems are defined.</li>
          </ul>
        </div>
        <div class="lecture-note">
          <h4>2. History and why AI rose again</h4>
          <p>The lecture emphasized that AI is not new. The current boom happened because three things came together: data, computation, and algorithms. Earlier AI waves had strong ideas, but less data and less compute.</p>
          <ul>
            <li>Alan Turing's 1950 question was: can machines think?</li>
            <li>The Turing-test idea belongs to the "acting humanly" view: can a machine behave like a human in conversation?</li>
            <li>The teacher connected recent AI progress to data, computation power, and algorithms. The detailed block below explains how each one changed AI from a lab idea into systems we use every day.</li>
          </ul>
        </div>
      </div>
      <div class="lecture-note">
        <h4>3. Four views of AI</h4>
        <p>The class used a 2 x 2 matrix. One axis separates thought from behavior. The other separates human-like from rational.</p>
        <p><span class="formula-chip">Thinking humanly</span><span class="formula-chip">Acting humanly</span><span class="formula-chip">Thinking rationally</span><span class="formula-chip">Acting rationally</span></p>
        <ul>
          <li><strong>Thinking humanly:</strong> build machines that model human mental activity such as learning, decision making, and problem solving.</li>
          <li><strong>Acting humanly:</strong> build machines that perform tasks that require intelligence when humans perform them. The Turing test sits here.</li>
          <li><strong>Thinking rationally:</strong> reason according to laws of thought and logic. This becomes hard because perfect logical reasoning can be computationally expensive.</li>
          <li><strong>Acting rationally:</strong> build agents that perceive, choose actions, and try to achieve the best outcome or best expected outcome.</li>
        </ul>
      </div>
      <div class="lecture-memory">
        <h4>Teacher's main position</h4>
        <p>The course leans toward <strong>acting rationally</strong>. A system need not think exactly like a human. It should perceive the environment, use available knowledge, and act to maximize goal achievement under constraints and uncertainty.</p>
      </div>
      <div class="lecture-note-grid">
        <div class="lecture-note">
          <h4>4. Rational agent idea</h4>
          <p>An agent is something that perceives and acts. A rational agent acts to achieve the best outcome; if outcomes are uncertain, it aims for the best expected outcome.</p>
          <p>This is why the next lecture immediately moves to PEAS: before solving a problem, you must specify what performance means, what the environment is, how the agent acts, and how it senses.</p>
        </div>
        <div class="lecture-note">
          <h4>5. Risks discussed</h4>
          <ul>
            <li>Autonomous weapons that can select and attack targets without human intervention.</li>
            <li>Surveillance and persuasion at large scale.</li>
            <li>Bias in decision systems when data reflects biased human behavior.</li>
            <li>Employment disruption and inequality, especially a shift of wealth from labor to capital.</li>
            <li>Safety-critical failures in healthcare, transport, or infrastructure.</li>
            <li>Cybersecurity risks and weak systems built without solid computing principles.</li>
          </ul>
        </div>
      </div>
      <div class="lecture-example">
        <h4>How to revise CS1</h4>
        <p>If an exam asks "define AI", do not give only one sentence. Mention the four perspectives, then say this course mainly uses the rational-agent view. Then connect rationality to perception, action, goals, uncertainty, and computational limits.</p>
      </div>
    `
  },
  cs2: {
    meta: "CS2 transcript + CS2 slides",
    title: "CS2: Intelligent Agents, PEAS, Environments, and Agent Types",
    body: `
      <div class="lecture-note">
        <h4>1. What is an agent?</h4>
        <p>The teacher defined an agent as anything that perceives its environment through sensors and acts upon that environment through actuators. A human, robot, diagnosis system, taxi, and vacuum cleaner can all be described this way.</p>
        <p><span class="formula-chip">Agent = sensors + actuators + decision program</span><span class="formula-chip">Rational = best expected action</span></p>
      </div>
      <div class="lecture-note-grid">
        <div class="lecture-note">
          <h4>2. PEAS specification</h4>
          <p>PEAS is how the teacher asked you to define an AI task before choosing a solution.</p>
          <ul>
            <li><strong>Performance:</strong> what counts as success?</li>
            <li><strong>Environment:</strong> where does the agent operate?</li>
            <li><strong>Actuators:</strong> what actions can it take?</li>
            <li><strong>Sensors:</strong> what information can it receive?</li>
          </ul>
        </div>
        <div class="lecture-example">
          <h4>Example from slides: medical diagnosis</h4>
          <ul>
            <li><strong>Performance:</strong> healthy patient, minimize costs, avoid lawsuits.</li>
            <li><strong>Environment:</strong> patient, hospital, staff.</li>
            <li><strong>Actuators:</strong> display questions, tests, diagnoses, treatments, referrals.</li>
            <li><strong>Sensors:</strong> keyboard entry of symptoms, findings, patient answers.</li>
          </ul>
        </div>
      </div>
      <div class="lecture-example">
        <h4>Example from slides: part-picking robot</h4>
        <ul>
          <li><strong>Performance:</strong> percentage of parts in correct bins.</li>
          <li><strong>Environment:</strong> conveyor belt with parts and bins.</li>
          <li><strong>Actuators:</strong> jointed arm and hand.</li>
          <li><strong>Sensors:</strong> camera and joint-angle sensors.</li>
        </ul>
      </div>
      <div class="lecture-note">
        <h4>3. Environment types</h4>
        <p>The teacher stressed that PEAS alone is not enough. You also classify the environment because that changes the agent architecture.</p>
        <ul>
          <li><strong>Fully observable vs partially observable:</strong> does the agent see the complete state? Chess is close to fully observable; poker and driving are partially observable.</li>
          <li><strong>Deterministic vs stochastic:</strong> is the next state completely determined by current state and action? Weather and traffic are stochastic.</li>
          <li><strong>Episodic vs sequential:</strong> does each decision stand alone, or do actions affect future decisions?</li>
          <li><strong>Static vs dynamic vs semi-dynamic:</strong> can the world change while the agent thinks?</li>
          <li><strong>Discrete vs continuous:</strong> are states/actions countable or continuous?</li>
          <li><strong>Single-agent vs multi-agent:</strong> is the agent alone, cooperating, competing, or self-interested among others?</li>
        </ul>
      </div>
      <div class="lecture-note-grid">
        <div class="lecture-note">
          <h4>4. Agent architectures</h4>
          <ul>
            <li><strong>Table-driven agent:</strong> lookup action for every percept history. Simple idea, impossible at scale.</li>
            <li><strong>Simple reflex agent:</strong> condition-action rules. Good only when the current percept is enough.</li>
            <li><strong>Model-based reflex agent:</strong> maintains internal state to handle partial observability.</li>
            <li><strong>Goal-based agent:</strong> chooses actions by asking which action sequence reaches a goal.</li>
            <li><strong>Utility-based agent:</strong> compares alternatives by usefulness, not just goal achievement.</li>
            <li><strong>Learning agent:</strong> improves behavior from feedback and experience.</li>
          </ul>
        </div>
        <div class="lecture-memory">
          <h4>What the teacher wanted you to remember</h4>
          <p>Simple reflex does not remember. Model-based remembers. Goal-based plans toward a goal. Utility-based optimizes among choices. Learning agents improve rather than only following fixed rules.</p>
        </div>
      </div>
      <div class="lecture-note">
        <h4>5. Problem-solving agents teaser</h4>
        <p>After agent types, the lecture started moving toward Problem Solving Agents. The idea is: once an agent has a goal, it can formulate the task as a search problem and then apply BFS, DFS, UCS, Greedy, A*, or another search technique.</p>
      </div>
    `
  },
  cs3: {
    meta: "CS3 transcript + CS3 slides",
    title: "CS3: Problem Formulation and Search Algorithms",
    body: `
      <div class="lecture-note">
        <h4>1. Problem formulation</h4>
        <p>The teacher repeatedly connected real-world AI to search. A vague real-world task must be converted into a formal problem before an algorithm can solve it.</p>
        <p><span class="formula-chip">State space</span><span class="formula-chip">Initial state</span><span class="formula-chip">Actions</span><span class="formula-chip">Transition model</span><span class="formula-chip">Goal test</span><span class="formula-chip">Path cost</span></p>
        <ul>
          <li><strong>State space:</strong> all possible configurations.</li>
          <li><strong>Initial state:</strong> where search begins.</li>
          <li><strong>Actions:</strong> legal moves from a state.</li>
          <li><strong>Transition model:</strong> what state results from an action.</li>
          <li><strong>Goal test:</strong> how to check success.</li>
          <li><strong>Path cost:</strong> cost accumulated along the route.</li>
        </ul>
      </div>
      <div class="lecture-note-grid">
        <div class="lecture-note">
          <h4>2. Uninformed search</h4>
          <p>Uninformed search is also called blind search. The algorithm has the problem definition, but no extra clue about how close a state is to the goal.</p>
          <ul>
            <li><strong>BFS:</strong> uses a queue. It is cautious because it expands all depth i paths before depth i+1.</li>
            <li><strong>DFS:</strong> uses a stack or recursion. It is aggressive because it follows one path deeply.</li>
            <li><strong>UCS:</strong> uses a priority queue by path cost g(n), so it expands the cheapest known path.</li>
            <li><strong>DLS:</strong> DFS with a depth limit.</li>
            <li><strong>IDS:</strong> repeats depth-limited search with increasing limits.</li>
          </ul>
        </div>
        <div class="lecture-note">
          <h4>3. Guarantees</h4>
          <ul>
            <li>BFS is complete when branching is finite and optimal when all step costs are equal.</li>
            <li>DFS uses less memory, but may fail in infinite-depth spaces and is not optimal.</li>
            <li>UCS is complete and optimal when step costs are positive.</li>
            <li>IDS gives BFS-like completeness with DFS-like memory for unit-cost depth problems.</li>
          </ul>
        </div>
      </div>
      <div class="lecture-note">
        <h4>4. Informed search</h4>
        <p>Informed search uses additional knowledge, usually a heuristic h(n), to estimate closeness to the goal. This is why it can avoid exploring huge parts of the search space.</p>
        <ul>
          <li><strong>Greedy best-first search:</strong> expands the node with smallest h(n). It can be fast, but it can be wrong because it ignores path cost already paid.</li>
          <li><strong>A* search:</strong> expands the node with smallest f(n) = g(n) + h(n). It balances cost so far and estimated cost remaining.</li>
        </ul>
        <p><span class="formula-chip">Greedy: f(n) = h(n)</span><span class="formula-chip">UCS: f(n) = g(n)</span><span class="formula-chip">A*: f(n) = g(n) + h(n)</span></p>
      </div>
      <div class="lecture-example">
        <h4>How to do a search example by hand</h4>
        <ol>
          <li>Write the current frontier.</li>
          <li>Select the next node using the algorithm rule: queue, stack, g(n), h(n), or f(n).</li>
          <li>Move selected node to explored.</li>
          <li>Add valid successors with their path, depth, g, h, and f values.</li>
          <li>Stop only when the goal is selected for expansion, not merely when it is first seen, unless the specific algorithm permits that.</li>
        </ol>
      </div>
      <div class="lecture-memory">
        <h4>Teacher's classroom emphasis</h4>
        <p>Do not memorize algorithm names separately from data structures. BFS means queue. DFS means stack. UCS means priority by path cost. Greedy means priority by heuristic. A* means priority by g+h.</p>
      </div>
    `
  },
  cs4: {
    meta: "CS4 transcript + CS4 slides",
    title: "CS4: Designing Heuristics and A* Conditions",
    body: `
      <div class="lecture-note">
        <h4>1. Why heuristics are needed</h4>
        <p>The teacher's point was simple: blind search explodes. A 15-puzzle has around 1.3 trillion possible states. BFS or DFS over such a state space becomes impractical, so the agent needs an educated estimate.</p>
        <p><span class="formula-chip">Heuristic = practical rule of thumb</span><span class="formula-chip">h(n) estimates cost from n to goal</span></p>
      </div>
      <div class="lecture-note-grid">
        <div class="lecture-example">
          <h4>8-puzzle heuristic activity</h4>
          <p>The slides compared two standard admissible heuristics:</p>
          <ul>
            <li><strong>h1(n):</strong> number of misplaced tiles.</li>
            <li><strong>h2(n):</strong> sum of Manhattan distances from each tile to its goal position.</li>
          </ul>
          <p>In the class activity, h1 was 8 and h2 was 18 for the shown state. The important lesson: both are admissible, but h2 is more informative because it knows how far tiles must move.</p>
        </div>
        <div class="lecture-note">
          <h4>2. Good heuristic design</h4>
          <ul>
            <li>It should reduce the number of nodes expanded.</li>
            <li>It should be cheap to compute.</li>
            <li>For A* optimality, it should maintain admissibility, and for graph search usually consistency is the stronger useful property.</li>
            <li>Better heuristics can come from relaxed problems, pattern databases, domain expertise, or empirical comparison.</li>
          </ul>
        </div>
      </div>
      <div class="lecture-note">
        <h4>3. A* and its two big conditions</h4>
        <p>A* uses the evaluation function below:</p>
        <p><span class="formula-chip">f(n) = g(n) + h(n)</span></p>
        <ul>
          <li><strong>g(n):</strong> actual path cost from start to n.</li>
          <li><strong>h(n):</strong> estimated cost from n to the goal.</li>
          <li><strong>f(n):</strong> estimated total cost of a solution path through n.</li>
        </ul>
        <p><strong>Admissible heuristic:</strong> 0 <= h(n) <= h*(n). It never overestimates the true remaining cost.</p>
        <p><strong>Consistent heuristic:</strong> h(n) <= c(n,a,n') + h(n'). This is like triangle inequality: direct estimated distance cannot be greater than taking one step plus the new estimate.</p>
      </div>
      <div class="lecture-note-grid">
        <div class="lecture-note">
          <h4>4. Relaxed problems</h4>
          <p>A relaxed problem removes constraints from the original problem. Solving the easier relaxed problem gives a lower bound for the real problem, so it can become an admissible heuristic.</p>
          <p>Example: in the 8-puzzle, if tiles could move more freely than in the real puzzle, the relaxed solution cost would not overestimate the true solution cost.</p>
        </div>
        <div class="lecture-note">
          <h4>5. Effective branching factor</h4>
          <p>The teacher mentioned heuristic quality through how much it reduces branching. If N nodes are expanded to find a solution at depth d, the effective branching factor b* is the value that roughly satisfies:</p>
          <p><span class="formula-chip">N + 1 = 1 + b* + (b*)^2 + ... + (b*)^d</span></p>
          <p>Lower b* means the heuristic is guiding the search better.</p>
        </div>
      </div>
      <div class="lecture-memory">
        <h4>Assignment-style warning from class</h4>
        <p>For a vague real-world problem, first create the rules, constraints, initial state, goal state, actions, transition model, and cost. Only then propose heuristics and test whether they are admissible and consistent.</p>
      </div>
    `
  },
  cs5: {
    meta: "CS5 transcript + CS5 slides",
    title: "CS5: Local Search and Evolutionary Algorithms",
    body: `
      <div class="lecture-note">
        <h4>1. The shift from path search to optimization</h4>
        <p>Earlier search algorithms treat the path as the solution: how do we get from start to goal? Local search changes the philosophy. In many optimization problems, the path is irrelevant; the final state itself is the answer.</p>
        <p><span class="formula-chip">Path search: solution is route</span><span class="formula-chip">Local search: solution is final configuration</span></p>
        <p>The teacher used 8-queens as the key example. A board configuration is a state. The goal is any configuration with no attacking queen pairs.</p>
      </div>
      <div class="lecture-note-grid">
        <div class="lecture-note">
          <h4>2. Why local search is useful</h4>
          <ul>
            <li>It keeps only the current state or a small population of states.</li>
            <li>It uses little memory compared with full tree/graph search.</li>
            <li>It works well for large or continuous spaces where storing paths is unrealistic.</li>
            <li>Applications include feature selection, hyperparameter tuning, scheduling, routing, and design optimization.</li>
          </ul>
        </div>
        <div class="lecture-note">
          <h4>3. Hill climbing</h4>
          <p>Hill climbing repeatedly moves to a better neighboring state. In 8-queens, a neighbor can be made by moving one queen within its column. The score can be conflicts, where lower is better, or fitness, where higher is better.</p>
          <ul>
            <li><strong>Steepest ascent:</strong> choose the best neighbor.</li>
            <li><strong>Stochastic hill climbing:</strong> choose randomly among improving moves, often weighted by improvement.</li>
            <li><strong>First-choice hill climbing:</strong> take the first improving move found.</li>
            <li><strong>Random restart:</strong> start again from new random states to escape bad local optima.</li>
          </ul>
        </div>
      </div>
      <div class="lecture-note-grid">
        <div class="lecture-note">
          <h4>4. Local search problems</h4>
          <ul>
            <li><strong>Local optimum:</strong> no neighbor is better, but the state is not globally best.</li>
            <li><strong>Plateau:</strong> many neighboring states have the same value, so progress becomes unclear.</li>
            <li><strong>Ridge:</strong> improvement exists, but simple moves do not follow it easily.</li>
          </ul>
        </div>
        <div class="lecture-note">
          <h4>5. Simulated annealing</h4>
          <p>Simulated annealing sometimes accepts a worse move. Early on, when temperature is high, it explores more. Later, as temperature falls, it behaves more like hill climbing. The purpose is to escape local optima.</p>
          <p><span class="formula-chip">Accept worse move with probability based on temperature</span></p>
        </div>
      </div>
      <div class="lecture-note">
        <h4>6. Local beam search</h4>
        <p>The teacher described beam search as hill climbing done in a parallel/distributed way. Instead of one current state, keep K current states. Generate successors, then keep the best K. K should not be too small, otherwise it collapses into hill climbing; it should not be too large, otherwise it becomes expensive.</p>
        <p>In stochastic beam search, the next K states can be selected probabilistically, so weaker states still have a chance to continue.</p>
      </div>
      <div class="lecture-note-grid">
        <div class="lecture-note">
          <h4>7. Genetic algorithms</h4>
          <p>The contrast with beam search was important: in beam search, parallel states mostly work independently. In genetic algorithms, the population collaborates through selection, crossover, and mutation.</p>
          <ul>
            <li><strong>Representation:</strong> encode each individual, such as queen row positions.</li>
            <li><strong>Initial population:</strong> random candidate solutions.</li>
            <li><strong>Fitness:</strong> score each candidate.</li>
            <li><strong>Selection:</strong> choose parents biased toward better fitness.</li>
            <li><strong>Crossover:</strong> combine parent parts to create children.</li>
            <li><strong>Mutation:</strong> randomly change part of a child to maintain diversity.</li>
          </ul>
        </div>
        <div class="lecture-note">
          <h4>8. Ant Colony Optimization</h4>
          <p>ACO was introduced as another life-inspired optimization method. Ants discover paths to food. Shorter successful paths receive stronger pheromone and become more likely to be chosen by later ants. Over time, the colony biases itself toward good routes.</p>
        </div>
      </div>
      <div class="lecture-memory">
        <h4>CS5 memory line</h4>
        <p>If the path matters, think BFS, DFS, UCS, A*. If the final configuration matters more than the path, think hill climbing, annealing, beam search, GA, or ACO.</p>
      </div>
    `
  },
  webinar1: {
    meta: "ACI Webinar 1 transcript + CS4 informed-search PPT",
    title: "Webinar 1: A*, IDA*, and Heuristic Search Practice",
    body: `
      <div class="lecture-note">
        <h4>1. Uninformed vs informed search recap</h4>
        <p>The webinar began by asking what uninformed search means. The answer: blind search. BFS, DFS, DLS, IDS, and UCS explore without extra knowledge of closeness to the goal. Informed search uses heuristic information to guide the search.</p>
        <ul>
          <li><strong>Uninformed:</strong> no h(n), searches using depth, stack/queue, or cost only.</li>
          <li><strong>Informed:</strong> uses h(n), an estimate of distance or cost to the goal.</li>
        </ul>
      </div>
      <div class="lecture-note-grid">
        <div class="lecture-note">
          <h4>2. A* core formula</h4>
          <p>The webinar and PPT centered on A*:</p>
          <p><span class="formula-chip">f(n) = g(n) + h(n)</span></p>
          <ul>
            <li><strong>g(n):</strong> cost to reach node n.</li>
            <li><strong>h(n):</strong> expected cost from n to the goal.</li>
            <li><strong>f(n):</strong> estimated total cheapest path through n.</li>
          </ul>
        </div>
        <div class="lecture-note">
          <h4>3. Open and closed lists</h4>
          <p>In normal A*, the open list stores frontier nodes waiting to be expanded. The closed list stores nodes already expanded. Each step selects the open node with smallest f(n).</p>
          <p>This is why the search lab on this page shows frontier, explored, g, h, and f together.</p>
        </div>
      </div>
      <div class="lecture-note">
        <h4>4. Admissibility and consistency</h4>
        <p>The webinar explained admissibility through overestimation. A heuristic is admissible if it never overestimates the true remaining cost.</p>
        <p><span class="formula-chip">Admissible: 0 <= h(n) <= h*(n)</span><span class="formula-chip">Consistent: h(n) <= c(n,n') + h(n')</span></p>
        <p>Consistency is connected to triangle inequality. If direct estimated distance is greater than going through a neighbor plus the neighbor's estimate, the heuristic is inconsistent.</p>
      </div>
      <div class="lecture-note-grid">
        <div class="lecture-note">
          <h4>5. IDA*</h4>
          <p>IDA* means Iterative Deepening A*. It combines the memory advantage of depth-first iterative deepening with A* style f-cost thresholds. The webinar compared it to iterative deepening DFS: instead of only increasing depth, IDA* increases an f-cost limit.</p>
          <ul>
            <li>It uses recursion/depth-first behavior.</li>
            <li>It avoids storing the entire open list like ordinary A*.</li>
            <li>It is useful when memory is a problem.</li>
          </ul>
        </div>
        <div class="lecture-note">
          <h4>6. Other informed variants</h4>
          <p>The webinar also named Greedy Best-First Search, Recursive Best-First Search, and memory-bounded A* variants. The main exam-level distinction is how they trade memory, optimality, and node expansion.</p>
        </div>
      </div>
      <div class="lecture-example">
        <h4>How to solve A* questions</h4>
        <ol>
          <li>Make a table with node, g(n), h(n), f(n), and parent.</li>
          <li>Start with the initial node in open.</li>
          <li>Pick the node with smallest f(n).</li>
          <li>Expand it, update children, and record better paths if found.</li>
          <li>Check admissibility by comparing h(n) with true remaining cost where known.</li>
          <li>Check consistency edge by edge using h(n) <= cost + h(child).</li>
        </ol>
      </div>
    `
  }
};

const lectureDeepDives = {
  cs1: `
    <div class="deep-dive">
      <div class="deep-title">
        <span>Deep explanation</span>
        <h4>Why did AI suddenly become powerful again?</h4>
        <p>The lecture said recent AI progress happened because data, computation power, and algorithms came together. Here is the slow, beginner-friendly version of that idea.</p>
      </div>
      <div class="detail-stack">
        <section class="detail-section">
          <h5>1. AI existed before the boom, but the ingredients were incomplete</h5>
          <p>AI as a field is old. The teacher reminded the class that the Turing question came in 1950, and AI research has existed for decades. But having the idea of intelligence is not the same as having enough resources to build intelligent systems. Earlier researchers had search, logic, planning, neural networks, and expert systems, but they were limited by small datasets, weak hardware, and algorithms that did not scale well.</p>
          <p>Think of AI like teaching a student. If the student has only ten examples, a slow calculator, and a poor study method, learning will be weak. Modern AI improved because all three parts improved together: the examples became huge, the calculator became massively parallel, and the study methods became better.</p>
        </section>
        <section class="detail-section">
          <h5>2. Data changed: the world started producing machine-readable experience</h5>
          <p>Older AI systems often depended on human experts writing rules manually. For example, an expert system for medicine might contain rules like "if fever and rash, consider disease X." That approach is useful, but it is brittle. Humans cannot manually write rules for every image, sentence, route, disease pattern, or fraud pattern.</p>
          <p>Modern AI uses large datasets as experience. Search engines, social media, digital payments, phone cameras, sensors, maps, hospitals, e-commerce, and educational platforms produce data in digital form. This gave AI systems examples of language, images, user choices, road networks, speech, transactions, and behavior. More examples allow models to learn patterns instead of only following hand-written rules.</p>
          <div class="teacher-example"><strong>Example:</strong> To recognize cats in images, an old rule-based system might try to describe ears, whiskers, eyes, and body shape. A learned model can look at millions of labeled images and learn visual patterns that are hard for humans to write as rules.</div>
        </section>
        <section class="detail-section">
          <h5>3. Compute changed: GPUs made large-scale learning practical</h5>
          <p>Training modern AI means doing a huge number of numerical operations. Neural networks especially depend on matrix multiplication. A normal CPU is flexible and good at general tasks, but GPUs are designed to do many similar mathematical operations in parallel. That made them extremely useful for machine learning.</p>
          <p>The teacher mentioned computation power because AI models that were theoretically possible earlier were not always practically trainable. If training takes years, the idea cannot be used. If better hardware reduces it to days or hours, experimentation becomes possible. Cloud computing also matters because organizations and researchers can rent hardware instead of owning all of it.</p>
          <div class="cause-grid">
            <div><strong>Before:</strong><span>Small models, slow experiments, limited training data.</span></div>
            <div><strong>After:</strong><span>Large models, faster training, many experiments, scalable deployment.</span></div>
          </div>
        </section>
        <section class="detail-section">
          <h5>4. Algorithms changed: systems learned better ways to represent and optimize</h5>
          <p>Data and compute alone are not enough. Algorithms decide how the system learns from data and how it searches for good answers. In this course, you first see search algorithms such as BFS, DFS, UCS, Greedy, and A*. Later AI uses optimization and learning algorithms to tune millions or billions of parameters.</p>
          <p>Important algorithmic progress includes better neural network architectures, better optimization methods, regularization, attention mechanisms, better search and planning ideas, and better ways to use feedback. The teacher's point was not that one magic algorithm created AI. The point was that many algorithmic improvements made it possible to convert raw data and compute into useful behavior.</p>
          <div class="teacher-example"><strong>Course connection:</strong> Search algorithms choose paths through a state space. Learning algorithms search through a space of possible models. Both are about finding something good among many possibilities.</div>
        </section>
        <section class="detail-section">
          <h5>5. Why all three must come together</h5>
          <p>If you have data but no compute, you cannot process it. If you have compute but no data, the model has little to learn from. If you have data and compute but poor algorithms, the system may memorize, overfit, or fail to generalize. The AI boom happened because these constraints reduced at the same time.</p>
          <ol>
            <li><strong>Data</strong> gave examples of real-world patterns.</li>
            <li><strong>Compute</strong> made it possible to process those examples at scale.</li>
            <li><strong>Algorithms</strong> converted examples and computation into models that can predict, generate, classify, plan, and act.</li>
          </ol>
          <p>This is why the teacher said AI is not suddenly new. The field matured when the ecosystem finally supported the ideas.</p>
        </section>
        <section class="detail-section">
          <h5>6. How this connects to the rational-agent view</h5>
          <p>The course is not only about chatbots or neural networks. The teacher wants you to think in terms of rational agents. Modern AI systems can perceive inputs, maintain internal representations, evaluate possible actions, and choose actions that improve a goal or utility. More data improves perception. More compute allows larger search or learning. Better algorithms improve decision quality.</p>
          <p>So the story is: AI progress gave us stronger tools, but the course framework still asks the same core question: given what the agent perceives and wants, what should it do?</p>
        </section>
        <section class="exam-box">
          <h5>Exam-ready answer</h5>
          <p>Recent AI progress accelerated because large digital datasets, powerful parallel computation such as GPUs/cloud platforms, and improved algorithms matured together. Data provides examples, compute makes large-scale training and search feasible, and algorithms turn data plus compute into useful models. Earlier AI had many ideas but lacked this scale, which led to systems that were narrower and more brittle.</p>
        </section>
      </div>
    </div>
  `,
  cs2: `
    <div class="deep-dive">
      <div class="deep-title">
        <span>Deep explanation</span>
        <h4>How PEAS and agent types should be understood</h4>
        <p>PEAS is not a table to memorize. It is the bridge from a vague AI idea to an implementable agent.</p>
      </div>
      <div class="detail-stack">
        <section class="detail-section">
          <h5>1. Why PEAS comes before algorithms</h5>
          <p>If someone says "build an AI doctor", that sentence is too vague. Does success mean fastest diagnosis, lowest cost, safest treatment, or patient satisfaction? What can the system observe? Can it order tests? Can it prescribe medicine? PEAS forces you to answer those questions before designing the agent.</p>
          <p>This is why the teacher spent time on medical diagnosis and part-picking robot examples. The same word "agent" becomes very different depending on performance measure, environment, actuators, and sensors.</p>
        </section>
        <section class="detail-section">
          <h5>2. Performance measure is not just accuracy</h5>
          <p>Beginners often write performance as "correct answer". In real AI systems, performance is multi-dimensional. A medical diagnosis system must be accurate, but also cost-aware, safe, legally defensible, and explainable. A taxi agent must reach the destination, but also avoid accidents, obey rules, reduce fuel use, and keep passengers comfortable.</p>
          <p>The performance measure shapes rationality. A rational agent is rational only with respect to the measure you give it. A bad performance measure can make an agent behave badly even if its algorithm is correct.</p>
        </section>
        <section class="detail-section">
          <h5>3. Environment type tells you how hard the agent's job is</h5>
          <p>In a fully observable deterministic static discrete single-agent world, the agent's job is easier. Chess is complicated, but the board is visible and legal moves are clear. Driving is harder because it is partially observable, stochastic, dynamic, continuous, and multi-agent. Other drivers and pedestrians can change the world while the agent is still deciding.</p>
          <div class="cause-grid">
            <div><strong>Simple world:</strong><span>More rules can be written directly. Search is cleaner.</span></div>
            <div><strong>Complex world:</strong><span>The agent needs memory, prediction, uncertainty handling, and utility trade-offs.</span></div>
          </div>
        </section>
        <section class="detail-section">
          <h5>4. Why simple reflex is limited</h5>
          <p>A simple reflex agent maps the current percept directly to an action. This works when the current percept contains everything needed. For example, if the vacuum perceives "current square dirty", it can suck. But if the agent cannot see the full world, it needs memory. Otherwise it may repeat actions, miss hidden information, or fail when the same percept requires different actions in different histories.</p>
        </section>
        <section class="detail-section">
          <h5>5. Model, goal, utility, and learning add capability step by step</h5>
          <ol>
            <li><strong>Model-based:</strong> remembers or estimates hidden parts of the world.</li>
            <li><strong>Goal-based:</strong> asks "what action sequence can get me to the goal?" This is where search enters.</li>
            <li><strong>Utility-based:</strong> asks "which outcome is best when there are trade-offs?"</li>
            <li><strong>Learning:</strong> improves the model, rules, or utility estimates from experience.</li>
          </ol>
          <p>So the agent types are not random categories. They are increasing levels of capability for increasingly difficult environments.</p>
        </section>
        <section class="exam-box">
          <h5>Exam-ready answer</h5>
          <p>For any AI application, first write PEAS. Then classify the environment. Then choose the agent type. If the environment is partially observable, a simple reflex agent is usually weak; model-based or learning behavior may be required. If the task requires planning, connect it to a goal-based problem-solving agent.</p>
        </section>
      </div>
    </div>
  `,
  cs3: `
    <div class="deep-dive">
      <div class="deep-title">
        <span>Deep explanation</span>
        <h4>How search algorithms actually differ</h4>
        <p>The names BFS, DFS, UCS, Greedy, and A* are less important than the question: which node is expanded next?</p>
      </div>
      <div class="detail-stack">
        <section class="detail-section">
          <h5>1. Search is controlled by the frontier</h5>
          <p>The frontier is the set of generated but not yet expanded nodes. Every search algorithm repeatedly removes one node from the frontier, checks or expands it, and adds successors. The only big difference is the rule used to pick the next node.</p>
          <ul>
            <li>BFS picks the oldest shallow node.</li>
            <li>DFS picks the newest deepest node.</li>
            <li>UCS picks the cheapest path so far, g(n).</li>
            <li>Greedy picks the state that looks closest to the goal, h(n).</li>
            <li>A* picks the cheapest estimated total path, g(n) + h(n).</li>
          </ul>
        </section>
        <section class="detail-section">
          <h5>2. BFS and DFS are not just "level" and "deep"</h5>
          <p>BFS is cautious. It refuses to go deeper until it has explored all shallower options. This is why it finds the shortest number-of-steps solution when all steps cost the same. But it can use a lot of memory because it stores the whole frontier at a level.</p>
          <p>DFS is aggressive. It follows one branch deeply. This uses less memory, but it can get trapped in a deep or infinite path and miss a shallow solution for a long time.</p>
        </section>
        <section class="detail-section">
          <h5>3. UCS fixes the "different cost" problem</h5>
          <p>If all actions cost 1, BFS is fine for optimality. But if one edge costs 100 and another costs 2, number of steps is not enough. UCS expands by total path cost g(n). That means it may choose a deeper path if the cost is lower. UCS is like Dijkstra's algorithm for search problems with a goal test.</p>
        </section>
        <section class="detail-section">
          <h5>4. Greedy can be fast and wrong</h5>
          <p>Greedy best-first search uses h(n) only. It asks "which node looks closest to the goal?" The danger is that a node may look close but require an expensive route. Greedy ignores the cost already paid, so it is not generally optimal.</p>
          <div class="teacher-example"><strong>Analogy:</strong> If a road looks geographically close to your destination but has heavy tolls, traffic, or blocked turns, greedy may still rush into it because it only sees closeness.</div>
        </section>
        <section class="detail-section">
          <h5>5. A* combines what UCS and Greedy know</h5>
          <p>A* uses f(n) = g(n) + h(n). The g(n) part prevents it from ignoring cost already paid. The h(n) part prevents it from searching blindly like UCS. This is why A* is a central informed-search algorithm.</p>
          <p>But A* is only as reliable as the heuristic. If h(n) overestimates badly, A* may skip the optimal path. That is why CS4 focuses on admissibility and consistency.</p>
        </section>
        <section class="exam-box">
          <h5>Exam-ready method</h5>
          <p>In any search question, draw a frontier table. For each node write path, depth, g, h, and f. Then apply the exact rule of the algorithm. Most mistakes happen when students select a node using the wrong priority.</p>
        </section>
      </div>
    </div>
  `,
  cs4: `
    <div class="deep-dive">
      <div class="deep-title">
        <span>Deep explanation</span>
        <h4>What makes a heuristic good?</h4>
        <p>A heuristic is not just a guess. It is a controlled estimate that trades guidance, computation cost, and correctness guarantees.</p>
      </div>
      <div class="detail-stack">
        <section class="detail-section">
          <h5>1. Why blind search explodes</h5>
          <p>If each state has b successors and the solution is at depth d, a blind search can face roughly b^d growth. Even small branching factors become huge as depth increases. That is why the teacher used examples like the 15-puzzle: the state space is far too large for naive exploration.</p>
        </section>
        <section class="detail-section">
          <h5>2. Heuristic means "use knowledge without solving the whole problem"</h5>
          <p>h(n) should estimate remaining cost without actually solving the problem from n. If computing h(n) is as hard as solving the full problem, it is not useful. Good heuristics are informative but cheap enough to calculate many times.</p>
        </section>
        <section class="detail-section">
          <h5>3. Misplaced tiles vs Manhattan distance</h5>
          <p>In 8-puzzle, misplaced tiles counts how many tiles are not in their goal position. Manhattan distance adds how many grid moves each tile is away from its goal. Manhattan distance dominates misplaced tiles because every misplaced tile must move at least once, but some tiles must move more than once.</p>
          <p>If h2(n) is always greater than or equal to h1(n), while still not overestimating the true cost, h2 usually guides A* better and expands fewer nodes.</p>
        </section>
        <section class="detail-section">
          <h5>4. Admissibility protects optimality</h5>
          <p>An admissible heuristic is optimistic. It never says the remaining cost is more than the true remaining cost. This matters because A* trusts f(n) = g(n) + h(n). If h(n) exaggerates, A* may believe a good path is worse than it really is and choose another path.</p>
        </section>
        <section class="detail-section">
          <h5>5. Consistency is local discipline on every edge</h5>
          <p>Consistency says h(n) <= c(n,n') + h(n'). This means the estimated distance from n to the goal cannot be more than the cost of taking one step to n' plus the estimate from n'. It prevents the heuristic from jumping around unrealistically.</p>
          <p>Every consistent heuristic is admissible under standard assumptions. That is why consistency is especially useful for graph search, where repeated states can appear.</p>
        </section>
        <section class="detail-section">
          <h5>6. Relaxed problems create admissible heuristics</h5>
          <p>A relaxed problem removes constraints. Since the relaxed problem is easier than the real problem, its solution cost cannot be greater than the real solution cost. That makes it a natural admissible heuristic. This is a powerful design pattern: solve an easier version to estimate the harder version.</p>
        </section>
        <section class="exam-box">
          <h5>Exam-ready answer</h5>
          <p>A good heuristic is informative, cheap, and safe. Informative means it reduces search. Cheap means it can be computed repeatedly. Safe means it does not overestimate if optimality is required. For A*, always check admissibility and consistency.</p>
        </section>
      </div>
    </div>
  `,
  cs5: `
    <div class="deep-dive">
      <div class="deep-title">
        <span>Deep explanation</span>
        <h4>Why local search is different from path search</h4>
        <p>Local search is used when you care about finding a good configuration, not the exact sequence of moves that got there.</p>
      </div>
      <div class="detail-stack">
        <section class="detail-section">
          <h5>1. The solution is the state itself</h5>
          <p>In route finding, the path matters because the answer is a route. In 8-queens, the answer is a board arrangement. It usually does not matter how you reached that arrangement. This is why local search can ignore full paths and keep only current candidate states.</p>
        </section>
        <section class="detail-section">
          <h5>2. Hill climbing uses a neighborhood</h5>
          <p>A neighborhood is the set of states reachable by a small change. In 8-queens, move one queen in its column. In scheduling, swap two tasks. In machine learning, slightly change a hyperparameter. Hill climbing checks neighbors and moves if the neighbor improves the objective.</p>
        </section>
        <section class="detail-section">
          <h5>3. Why hill climbing can fail</h5>
          <p>Hill climbing is greedy in the local sense. It may stop at a local optimum where no immediate neighbor is better, even though a better solution exists elsewhere. It may also wander on plateaus where many states have equal value. This is why random restart, stochastic movement, and simulated annealing are introduced.</p>
        </section>
        <section class="detail-section">
          <h5>4. Simulated annealing allows controlled mistakes</h5>
          <p>Sometimes you must temporarily move to a worse state to later reach a better region. Simulated annealing allows this with a probability controlled by temperature. High temperature means more exploration. Low temperature means more exploitation. As temperature cools, the algorithm becomes stricter.</p>
        </section>
        <section class="detail-section">
          <h5>5. Beam search keeps multiple hopes alive</h5>
          <p>Instead of depending on one current state, local beam search keeps K states. This reduces the risk that one bad starting point ruins the search. But if all beams quickly become similar, diversity is lost. Stochastic beam search helps by selecting some states probabilistically.</p>
        </section>
        <section class="detail-section">
          <h5>6. Genetic algorithms use collaboration</h5>
          <p>In the teacher's comparison, beam states are mostly separate hill climbers. Genetic algorithms combine information from individuals. Better individuals are more likely to become parents. Crossover mixes parent structure. Mutation introduces novelty. Over generations, the population can improve.</p>
        </section>
        <section class="detail-section">
          <h5>7. ACO stores learning in the environment</h5>
          <p>Ant Colony Optimization is population-based, but its shared memory is pheromone. Good paths receive more pheromone, and future ants become more likely to choose them. Evaporation prevents early bad choices from dominating forever.</p>
        </section>
        <section class="exam-box">
          <h5>Exam-ready distinction</h5>
          <p>Use systematic search when the path to a goal matters. Use local or evolutionary search when the final configuration is what matters and the state space is too large for full path exploration.</p>
        </section>
      </div>
    </div>
  `,
  webinar1: `
    <div class="deep-dive">
      <div class="deep-title">
        <span>Deep explanation</span>
        <h4>How to think through A* step by step</h4>
        <p>The webinar was practice-oriented: understand open list, closed list, f-cost, admissibility, consistency, and IDA*.</p>
      </div>
      <div class="detail-stack">
        <section class="detail-section">
          <h5>1. A* is not just "use a heuristic"</h5>
          <p>Greedy search also uses a heuristic. The special thing about A* is that it adds the real cost already paid, g(n), to the estimated cost remaining, h(n). This prevents the algorithm from blindly chasing a node that looks close but is expensive to reach.</p>
        </section>
        <section class="detail-section">
          <h5>2. Open list and closed list</h5>
          <p>The open list is the frontier. It contains nodes discovered but not yet expanded. The closed list contains nodes already expanded. At every A* step, choose the open node with the smallest f(n). After expansion, put it in closed and update its neighbors.</p>
        </section>
        <section class="detail-section">
          <h5>3. When do you stop?</h5>
          <p>For standard A*, you stop when the goal node is selected for expansion from the open list, not merely when the goal is first generated. This distinction matters because another path to the goal with lower total cost may still be waiting in the frontier.</p>
        </section>
        <section class="detail-section">
          <h5>4. Why admissibility matters in examples</h5>
          <p>If h(n) overestimates, the f-value can become too high. Then A* may postpone or ignore a path that is actually optimal. In exam problems, if true remaining costs are given, compare each h(n) to the true cost h*(n).</p>
        </section>
        <section class="detail-section">
          <h5>5. Why consistency is checked edge by edge</h5>
          <p>Consistency is local. You do not check it only at the start node. For every edge n -> n', verify h(n) <= cost(n,n') + h(n'). If any edge violates it, the heuristic is inconsistent.</p>
        </section>
        <section class="detail-section">
          <h5>6. IDA* solves memory pressure</h5>
          <p>Ordinary A* may store many frontier nodes. IDA* uses depth-first style recursion with an f-cost threshold. It searches paths whose f is within the current threshold. If it fails, it increases the threshold and tries again. This trades repeated work for much lower memory.</p>
        </section>
        <section class="exam-box">
          <h5>Exam-ready A* table</h5>
          <p>For each step, maintain: node, parent, g(n), h(n), f(n), open list, closed list. Pick the smallest f. If there is a tie, follow the tie-breaking rule given in the question or use a consistent alphabetical/order convention and state it.</p>
        </section>
      </div>
    </div>
  `
};

const lectureMaps = {
  cs1: {
    title: "CS1 concept map",
    nodes: [
      {
        id: "ai-foundation",
        label: "AI Foundations",
        type: "core",
        x: 50,
        y: 48,
        summary: "CS1 builds the mental frame for the course: AI is not only chatbots or neural networks. It is the study of systems that perceive, reason, learn, and act.",
        details: [
          "The teacher first placed the course as a core AI course. That means you are expected to understand the ideas behind intelligent systems, not only run tools.",
          "The lecture moved from course handout and textbook to the history of AI, definitions of AI, rational agents, applications, risks, and the transition into PEAS.",
          "This map should be read from the center outward: first understand what AI is, then why it grew, then which definition this course prefers, then why responsible design matters."
        ],
        example: "Revision path: definition of AI -> four perspectives -> rational agent -> risks -> PEAS in the next lecture."
      },
      {
        id: "turing",
        label: "Turing Question",
        type: "process",
        x: 18,
        y: 20,
        summary: "Alan Turing's 1950 question, 'can machines think?', is a historical starting point for discussing machine intelligence.",
        details: [
          "The lecture used Turing to show that AI is not a new topic. People were already asking about machine intelligence when modern computers themselves were young.",
          "The Turing-test style view asks whether a machine can behave in a way that makes a human judge think it is human.",
          "This belongs mainly to acting humanly, because the focus is observable behavior, not whether the machine internally thinks like a human."
        ],
        example: "If a chatbot convinces a human evaluator that it is human, it may satisfy an acting-humanly test, but that does not prove it reasons like a human."
      },
      {
        id: "four-views",
        label: "Four Views",
        type: "formula",
        x: 50,
        y: 16,
        summary: "The 2 x 2 matrix separates thought vs behavior and human-like vs rational approaches.",
        details: [
          "Thinking humanly: model human mental processes.",
          "Acting humanly: make machines perform tasks that require intelligence when done by people.",
          "Thinking rationally: use logic and laws of thought to reason correctly.",
          "Acting rationally: perceive and act to achieve the best outcome or best expected outcome."
        ],
        example: "Deep Blue did not need to think exactly like a human chess player. It only needed to choose strong moves. That leans toward rational action rather than human imitation."
      },
      {
        id: "boom",
        label: "Data + Compute + Algorithms",
        type: "process",
        x: 82,
        y: 20,
        summary: "The modern AI boom happened because the ecosystem matured: massive data, GPU/cloud compute, and improved algorithms became available together.",
        details: [
          "Data gives examples. Without examples, systems depend heavily on manually written rules.",
          "Compute makes large training and search practical. GPUs are good at parallel matrix operations, which are central to neural networks.",
          "Algorithms decide how learning and search happen. Better architectures, optimization methods, and training procedures convert data and compute into useful behavior.",
          "All three are necessary. Data without compute cannot be processed. Compute without data has little to learn. Both without good algorithms do not generalize well."
        ],
        example: "Image recognition improved when systems could train on huge image datasets using GPU acceleration and algorithms that learn visual features automatically."
      },
      {
        id: "rational-agent",
        label: "Rational Agent",
        type: "core",
        x: 24,
        y: 78,
        summary: "The course mainly prefers the acting-rationally definition: an agent should act to achieve the best outcome under the available information.",
        details: [
          "An agent perceives through sensors and acts through actuators.",
          "Rational does not mean perfect. The teacher emphasized that computational limits make perfect rationality impossible in many real cases.",
          "Rational behavior means choosing the action expected to maximize goal achievement, given what the agent knows at that moment."
        ],
        example: "A navigation agent may not know future traffic perfectly, but it can still choose the route with the best expected travel time using current information."
      },
      {
        id: "risks",
        label: "AI Risks",
        type: "warning",
        x: 76,
        y: 78,
        summary: "The lecture did not present AI as only positive. It discussed autonomous weapons, surveillance, bias, employment effects, safety-critical failures, and cybersecurity.",
        details: [
          "Autonomous weapons show the danger of agents that can select and act without human intervention.",
          "Surveillance and persuasion show how AI can scale monitoring and influence.",
          "Bias appears when systems learn from biased real-world data or when performance measures ignore fairness.",
          "Employment impact is not only job loss. The teacher emphasized inequality and the shift of wealth from labor to capital."
        ],
        example: "If a hiring model learns from biased historical hiring data, acting humanly may reproduce human bias. Rational design must define better goals and constraints."
      }
    ],
    links: [
      ["ai-foundation", "turing", "starts from"],
      ["ai-foundation", "four-views", "defines"],
      ["ai-foundation", "boom", "explains"],
      ["four-views", "rational-agent", "course prefers"],
      ["rational-agent", "risks", "must govern"],
      ["boom", "risks", "scales impact"]
    ]
  },
  cs2: {
    title: "CS2 concept map",
    nodes: [
      {
        id: "agent",
        label: "Intelligent Agent",
        type: "core",
        x: 50,
        y: 48,
        summary: "An agent perceives the environment through sensors and acts on it through actuators.",
        details: [
          "This definition is intentionally broad. A human, robot, medical diagnosis system, taxi, and vacuum cleaner can all be agents.",
          "The agent idea converts AI from an abstract intelligence discussion into an engineering structure: inputs, internal decision process, outputs, and performance.",
          "The lecture uses agents because the course is about building systems that act rationally, not only systems that produce answers."
        ],
        example: "A vacuum agent senses dirt and location, then acts by moving, sucking dirt, stopping, or docking."
      },
      {
        id: "peas",
        label: "PEAS",
        type: "formula",
        x: 50,
        y: 16,
        summary: "PEAS means Performance, Environment, Actuators, and Sensors. It is the first formal description of an AI task.",
        details: [
          "Performance asks what success means. This is the most important part because it defines rational behavior.",
          "Environment describes where the agent operates and what objects or other agents exist there.",
          "Actuators define what the agent can do. Sensors define what information the agent can receive.",
          "A poor PEAS definition can lead to a poor agent even if the algorithm is technically correct."
        ],
        example: "Medical diagnosis PEAS: healthy patient and low cost; patient/hospital/staff; questions/tests/diagnoses; symptoms/findings/patient answers."
      },
      {
        id: "environment",
        label: "Environment Types",
        type: "process",
        x: 18,
        y: 22,
        summary: "Environment classification tells you how hard the decision problem is and what kind of agent architecture may be needed.",
        details: [
          "Fully observable vs partially observable asks whether the agent sees the complete state.",
          "Deterministic vs stochastic asks whether the next state is predictable from current state and action.",
          "Static vs dynamic asks whether the world changes while the agent is thinking.",
          "Discrete vs continuous asks whether states, actions, and time are countable or smooth.",
          "Single-agent vs multi-agent asks whether other agents cooperate, compete, or act independently."
        ],
        example: "Chess is mostly fully observable and discrete. Autonomous driving is partially observable, stochastic, dynamic, continuous, and multi-agent."
      },
      {
        id: "sensors",
        label: "Sensors and Actuators",
        type: "process",
        x: 82,
        y: 22,
        summary: "Sensors and actuators are the boundary between the agent and the world.",
        details: [
          "Sensors decide what the agent can know. If a useful fact cannot be sensed or inferred, the agent cannot directly use it.",
          "Actuators decide what the agent can change. A system may know the best action but be unable to perform it if it lacks the actuator.",
          "Many design failures happen because people imagine an all-knowing agent instead of listing actual sensors."
        ],
        example: "A part-picking robot uses camera and joint-angle sensors, then acts through a jointed arm and hand."
      },
      {
        id: "architectures",
        label: "Agent Types",
        type: "core",
        x: 22,
        y: 78,
        summary: "Agent architectures increase in capability: table-driven, simple reflex, model-based, goal-based, utility-based, and learning.",
        details: [
          "Simple reflex agents react to the current percept with condition-action rules.",
          "Model-based agents keep internal state, so they can handle partial observability better.",
          "Goal-based agents choose action sequences that reach goals, which naturally leads to search.",
          "Utility-based agents compare outcomes when multiple goals or trade-offs exist.",
          "Learning agents improve from feedback instead of depending only on fixed rules."
        ],
        example: "A taxi agent should be utility-based, not only goal-based, because it must trade speed, safety, comfort, legality, and cost."
      },
      {
        id: "psa",
        label: "Problem Solving Agent",
        type: "formula",
        x: 78,
        y: 78,
        summary: "A problem-solving agent converts a goal into a search problem. This is the bridge from CS2 to CS3.",
        details: [
          "Once an agent has a goal, it needs a way to decide the sequence of actions.",
          "Problem solving means defining states, actions, transitions, goal test, and path cost.",
          "Search algorithms are not chosen in isolation. They depend on the agent's PEAS, environment, and goal."
        ],
        example: "A route agent turns 'reach destination' into states as locations, actions as roads, transition as movement, and cost as distance or time."
      }
    ],
    links: [
      ["agent", "peas", "specified by"],
      ["agent", "environment", "lives in"],
      ["agent", "sensors", "uses"],
      ["peas", "architectures", "guides"],
      ["environment", "architectures", "chooses"],
      ["architectures", "psa", "goal leads to"]
    ]
  },
  cs3: {
    title: "CS3 concept map",
    nodes: [
      {
        id: "search",
        label: "Search Problem",
        type: "core",
        x: 50,
        y: 48,
        summary: "Search is the process of exploring possible states to find a goal state or a path to a goal.",
        details: [
          "The teacher's key idea was that many early AI problems were solved by modeling the real world as a search problem.",
          "A search problem is not just a graph. It is a formal model containing states, actions, transition model, goal test, and cost.",
          "Once the model is created, algorithms can systematically explore it."
        ],
        example: "In route finding, states are cities or map locations, actions are road choices, and path cost may be distance, time, or fuel."
      },
      {
        id: "formulation",
        label: "Problem Formulation",
        type: "formula",
        x: 50,
        y: 16,
        summary: "Problem formulation converts a vague story into exact search components.",
        details: [
          "State space: all possible configurations.",
          "Initial state: the start.",
          "Actions: legal moves.",
          "Transition model: what each action produces.",
          "Goal test: how success is recognized.",
          "Path cost: how expensive a path is."
        ],
        example: "For 8-puzzle, states are tile arrangements; actions move the blank; goal test checks whether all tiles are in target order."
      },
      {
        id: "frontier",
        label: "Frontier",
        type: "process",
        x: 18,
        y: 22,
        summary: "The frontier is the live boundary of search: nodes generated but not yet expanded.",
        details: [
          "Every search strategy can be understood by how it orders the frontier.",
          "BFS treats the frontier as a queue. DFS treats it as a stack. UCS, Greedy, and A* treat it as a priority queue.",
          "This is the easiest way to avoid confusion during hand-solved problems."
        ],
        example: "If frontier is [B, C, D], BFS expands B next. DFS may expand D next. A* expands whichever has the smallest f value."
      },
      {
        id: "uninformed",
        label: "Uninformed Search",
        type: "process",
        x: 82,
        y: 22,
        summary: "Uninformed search has no estimate of closeness to the goal. It only uses structure and path cost.",
        details: [
          "BFS expands shallowest nodes first and is optimal for equal step costs.",
          "DFS expands deepest nodes first and uses less memory but is not generally complete or optimal.",
          "UCS expands lowest path-cost g(n) and is optimal for positive costs.",
          "IDS repeats depth-limited search to combine DFS memory behavior with BFS completeness for unit-cost depth."
        ],
        example: "If all edges cost 1, BFS is usually the clean shortest-path choice. If edge costs differ, UCS is safer for optimality."
      },
      {
        id: "informed",
        label: "Informed Search",
        type: "core",
        x: 24,
        y: 78,
        summary: "Informed search uses heuristic knowledge h(n) to guide exploration toward promising states.",
        details: [
          "Greedy best-first search uses h(n) only. It is often fast but can be misled.",
          "A* uses g(n) + h(n), balancing cost already paid with estimated cost remaining.",
          "The quality of informed search depends heavily on the heuristic."
        ],
        example: "A map heuristic may use straight-line distance to the destination. It gives direction, but it must be used carefully if roads are blocked or costs differ."
      },
      {
        id: "guarantees",
        label: "Completeness and Optimality",
        type: "warning",
        x: 76,
        y: 78,
        summary: "Algorithm guarantees depend on assumptions such as finite branching, positive costs, equal step costs, and heuristic quality.",
        details: [
          "Complete means the algorithm finds a solution if one exists.",
          "Optimal means it finds the best solution according to path cost.",
          "BFS is optimal only under equal step costs. UCS handles different positive costs. A* needs admissible and usually consistent heuristics for optimal graph-search behavior."
        ],
        example: "A student mistake is saying BFS is always optimal. It is not always optimal when step costs differ."
      }
    ],
    links: [
      ["search", "formulation", "needs"],
      ["search", "frontier", "maintains"],
      ["frontier", "uninformed", "ordered by"],
      ["frontier", "informed", "ordered by"],
      ["informed", "guarantees", "depends on"],
      ["uninformed", "guarantees", "assumptions"]
    ]
  },
  cs4: {
    title: "CS4 concept map",
    nodes: [
      {
        id: "heuristics",
        label: "Heuristics",
        type: "core",
        x: 50,
        y: 48,
        summary: "A heuristic is an educated estimate that guides search without solving the whole problem.",
        details: [
          "The teacher introduced heuristics as the 'good enough' guiding star.",
          "h(n) estimates the cost from current state n to the goal.",
          "A heuristic should be informative enough to reduce search, but cheap enough to compute many times."
        ],
        example: "In route search, straight-line distance can estimate remaining travel distance."
      },
      {
        id: "explosion",
        label: "Search Explosion",
        type: "warning",
        x: 18,
        y: 20,
        summary: "Blind search grows too fast in large state spaces, making heuristics necessary.",
        details: [
          "If branching factor is b and solution depth is d, the number of possible paths can grow roughly like b to the power d.",
          "The lecture used puzzle state spaces to show that uninformed search can become infeasible.",
          "Heuristics reduce wasted expansion by pointing the search toward better regions."
        ],
        example: "A 15-puzzle has an enormous number of states, so expanding blindly is usually impractical."
      },
      {
        id: "h-values",
        label: "h1 and h2",
        type: "formula",
        x: 50,
        y: 16,
        summary: "The lecture compared misplaced tiles h1 and Manhattan distance h2 for the 8-puzzle.",
        details: [
          "h1 counts how many tiles are in the wrong position.",
          "h2 sums the grid distance from each tile to its goal location.",
          "Both can be admissible, but h2 is usually more informative because it measures distance, not only wrongness."
        ],
        example: "If a tile is three moves away, h1 counts it as 1, while Manhattan distance counts 3."
      },
      {
        id: "admissible",
        label: "Admissible",
        type: "process",
        x: 82,
        y: 20,
        summary: "An admissible heuristic never overestimates the true remaining cost.",
        details: [
          "Formally: 0 <= h(n) <= h*(n), where h*(n) is the true cost from n to the goal.",
          "Admissibility protects A* from wrongly rejecting the optimal path.",
          "It is optimistic: it may underestimate, but it must not exaggerate."
        ],
        example: "Straight-line distance is admissible for road distance when roads cannot be shorter than direct geometric distance."
      },
      {
        id: "consistent",
        label: "Consistent",
        type: "process",
        x: 24,
        y: 78,
        summary: "A consistent heuristic obeys a triangle-inequality style rule on every edge.",
        details: [
          "For every edge from n to n', h(n) <= c(n,n') + h(n').",
          "This prevents h-values from dropping too sharply after a small move.",
          "Consistency is especially useful in graph search because states may be reached by multiple paths."
        ],
        example: "If h(A) is 10, edge A to B costs 3, and h(B) is 4, then 10 <= 3 + 4 is false, so the heuristic is inconsistent."
      },
      {
        id: "relaxed",
        label: "Relaxed Problems",
        type: "core",
        x: 76,
        y: 78,
        summary: "A relaxed problem removes constraints. Its solution cost gives a lower bound for the real problem.",
        details: [
          "Because the relaxed problem is easier, it cannot cost more than the original problem.",
          "That makes relaxed-problem solutions a common source of admissible heuristics.",
          "Pattern databases are another way to store precomputed solution costs for abstractions of the problem."
        ],
        example: "If puzzle tiles were allowed to move more freely, the relaxed solution cost would not exceed the real puzzle cost."
      }
    ],
    links: [
      ["heuristics", "explosion", "solves"],
      ["heuristics", "h-values", "example"],
      ["heuristics", "admissible", "must be"],
      ["admissible", "consistent", "strengthened by"],
      ["relaxed", "admissible", "creates"],
      ["h-values", "relaxed", "motivates"]
    ]
  },
  cs5: {
    title: "CS5 concept map",
    nodes: [
      {
        id: "local",
        label: "Local Search",
        type: "core",
        x: 50,
        y: 48,
        summary: "Local search improves candidate states directly instead of constructing full paths.",
        details: [
          "The key shift is that the final state is the answer. The path used to reach it may be irrelevant.",
          "This makes local search memory efficient because it can store only one state or a small population.",
          "It is useful for huge optimization spaces where full search trees are impossible."
        ],
        example: "In 8-queens, a valid board is the solution. The sequence of board changes is not important."
      },
      {
        id: "state-solution",
        label: "State is Solution",
        type: "formula",
        x: 50,
        y: 16,
        summary: "In local search, a complete configuration is evaluated directly.",
        details: [
          "A candidate is not a partial path. It is a full proposed solution.",
          "The objective function or fitness function tells how good the candidate is.",
          "Neighbors are created by small edits to the current candidate."
        ],
        example: "An 8-queens board with row positions [4,2,7,3,6,8,5,1] is a full candidate solution."
      },
      {
        id: "hill",
        label: "Hill Climbing",
        type: "process",
        x: 18,
        y: 22,
        summary: "Hill climbing repeatedly moves to a better neighbor.",
        details: [
          "Steepest ascent chooses the best neighbor.",
          "Stochastic hill climbing chooses among improving moves probabilistically.",
          "Random restart begins again from new states to avoid being trapped by a poor start."
        ],
        example: "Move one queen in a column if that reduces the number of attacking pairs."
      },
      {
        id: "failures",
        label: "Local Traps",
        type: "warning",
        x: 82,
        y: 22,
        summary: "Local search can fail at local optima, plateaus, and ridges.",
        details: [
          "A local optimum has no better neighbor but is not globally best.",
          "A plateau has many equal-value states, so the algorithm does not know where progress is.",
          "A ridge requires a sequence of sideways or temporarily worse moves to improve."
        ],
        example: "Hill climbing may stop at 2 queen conflicts even though a zero-conflict board exists elsewhere."
      },
      {
        id: "annealing",
        label: "Simulated Annealing",
        type: "process",
        x: 18,
        y: 78,
        summary: "Simulated annealing sometimes accepts worse moves to escape traps.",
        details: [
          "At high temperature, the algorithm explores more freely.",
          "At low temperature, it becomes stricter and behaves more like hill climbing.",
          "The cooling schedule controls the exploration to exploitation transition."
        ],
        example: "A worse move may be accepted early if it can help cross a valley toward a better peak."
      },
      {
        id: "population",
        label: "Beam + GA + ACO",
        type: "core",
        x: 82,
        y: 78,
        summary: "Population-based methods keep multiple candidates and share information across them.",
        details: [
          "Local beam search keeps K states and continues with the best K successors.",
          "Genetic algorithms use selection, crossover, and mutation to evolve a population.",
          "ACO uses pheromone as shared memory in the environment, biasing future search toward successful paths."
        ],
        example: "GA combines parts of two 8-queens boards to create a child board, then may mutate one queen position."
      }
    ],
    links: [
      ["local", "state-solution", "because"],
      ["local", "hill", "method"],
      ["hill", "failures", "can hit"],
      ["failures", "annealing", "escaped by"],
      ["local", "population", "scaled by"],
      ["population", "failures", "reduces risk"]
    ]
  },
  webinar1: {
    title: "Webinar A* concept map",
    nodes: [
      {
        id: "astar",
        label: "A* Search",
        type: "core",
        x: 50,
        y: 48,
        summary: "A* chooses the frontier node with the lowest estimated total path cost.",
        details: [
          "A* is informed search because it uses h(n).",
          "It is not greedy alone because it also uses g(n), the real cost already paid.",
          "It becomes powerful when h(n) guides search without breaking optimality conditions."
        ],
        example: "If B has g=2 and h=6, f=8. If E has g=3 and h=7, f=10. A* expands B first."
      },
      {
        id: "formula",
        label: "f = g + h",
        type: "formula",
        x: 50,
        y: 16,
        summary: "The core A* evaluation function is f(n) = g(n) + h(n).",
        details: [
          "g(n) is path cost from start to n.",
          "h(n) is estimated cost from n to the goal.",
          "f(n) estimates the total solution cost through n."
        ],
        example: "If reaching C costs 3 and C's heuristic is 99, f(C)=102. That makes C unattractive unless no better options exist."
      },
      {
        id: "open",
        label: "Open List",
        type: "process",
        x: 18,
        y: 22,
        summary: "The open list is the frontier: nodes discovered but not expanded.",
        details: [
          "At every step, choose the open node with minimum f.",
          "When a node is expanded, its successors are inserted or updated.",
          "The open list is where most hand-calculation errors happen."
        ],
        example: "After expanding A, open may contain B, E, and other neighbors with their g, h, and f values."
      },
      {
        id: "closed",
        label: "Closed List",
        type: "process",
        x: 82,
        y: 22,
        summary: "The closed list stores expanded nodes so the algorithm does not repeat work unnecessarily.",
        details: [
          "Closed is important in graph search because the same state may be reached by many paths.",
          "If a better path to a previously seen node is found, update rules depend on the exact A* variant and consistency assumptions.",
          "With consistent heuristics, graph-search A* behaves cleanly because f-values do not need to decrease along paths."
        ],
        example: "If A was expanded, put A in closed. Do not expand it again unless your algorithm explicitly reopens nodes."
      },
      {
        id: "conditions",
        label: "Admissible + Consistent",
        type: "warning",
        x: 24,
        y: 78,
        summary: "A* guarantees depend on heuristic discipline.",
        details: [
          "Admissible means never overestimate true remaining cost.",
          "Consistent means h(n) <= cost(n,n') + h(n') for every edge.",
          "Consistency is checked edge by edge, not only at the start."
        ],
        example: "For edge A to B cost 6, h(A)=10 and h(B)=5 passes because 10 <= 6+5."
      },
      {
        id: "ida",
        label: "IDA*",
        type: "core",
        x: 76,
        y: 78,
        summary: "IDA* uses iterative deepening with f-cost thresholds to reduce memory.",
        details: [
          "Ordinary A* can store a large open list.",
          "IDA* searches depth-first under a current f-limit.",
          "If the goal is not found, it raises the f-limit and searches again.",
          "The trade-off is lower memory but possible repeated work."
        ],
        example: "Instead of keeping all frontier nodes, IDA* recursively explores paths whose f does not exceed the current threshold."
      }
    ],
    links: [
      ["astar", "formula", "uses"],
      ["astar", "open", "selects from"],
      ["astar", "closed", "records"],
      ["formula", "conditions", "needs"],
      ["conditions", "ida", "also matters"],
      ["open", "ida", "memory issue"]
    ]
  }
};

const lectureTranscriptLinks = {
  cs1: "transcripts/CS1_transcript.txt",
  cs2: "transcripts/CS2_transcript.txt",
  cs3: "transcripts/CS3_transcript.txt",
  cs4: "transcripts/CS4_transcript.txt",
  cs5: "transcripts/CS5_transcript.txt",
  webinar1: "transcripts/Webinar1_transcript.txt"
};

const lectureBooks = {
  cs1: `
    <div class="notebook-intro">
      <h4>Full lecture notebook: CS1 foundations</h4>
      <p>This is the expanded version of what CS1 is trying to teach. Read it as a story: first the course tells you what AI is, then why AI grew, then which definition of AI this course follows, then why risks matter.</p>
    </div>
    <div class="notebook-grid">
      <section class="notebook-section">
        <h5>1. Course orientation: what this course is really about</h5>
        <p>The teacher did not start directly with algorithms because AI is not only a list of algorithms. The course is about how an intelligent system is specified, how it gets knowledge, how it reasons, how it searches, how it handles uncertainty, and how it acts.</p>
        <p>The first few lectures build the foundation for the search module. The order is important: AI definition -> rational agent -> PEAS -> environment -> problem formulation -> search algorithms.</p>
        <div class="flow-strip"><span>AI idea</span><span>Agent</span><span>PEAS</span><span>Problem</span><span>Search</span><span>Action</span></div>
        <p>So when you later see BFS or A*, do not treat them as isolated data-structure tricks. They are methods used by a problem-solving agent after the task has been formalized.</p>
      </section>
      <section class="notebook-section">
        <h5>2. Why AI is not new</h5>
        <p>The lecture emphasized that AI did not appear suddenly with recent chatbots. Alan Turing was already asking whether machines can think in 1950. Over time, AI went through periods of excitement, disappointment, and renewed growth.</p>
        <p>The important exam idea is that AI progress is not linear. Sometimes ideas exist before the hardware or data needed to make them practical. When expectations rise too fast and systems fail to deliver, interest can reduce; this is often called an AI winter.</p>
        <ul>
          <li><strong>Old AI strength:</strong> symbolic reasoning, search, logic, expert systems, planning.</li>
          <li><strong>Old AI limitation:</strong> hand-written rules, small data, weak compute, brittle real-world behavior.</li>
          <li><strong>Modern AI strength:</strong> learning from large data, scalable compute, stronger optimization, better models.</li>
        </ul>
      </section>
    </div>
    <section class="notebook-section">
      <h5>3. The three ingredients behind the recent AI boom</h5>
      <p>The teacher mentioned data, computation power, and algorithms. This point deserves a full explanation because it explains why AI became practical now.</p>
      <table class="lecture-table">
        <thead><tr><th>Ingredient</th><th>Meaning</th><th>Why it changed AI</th><th>Simple example</th></tr></thead>
        <tbody>
          <tr><td>Data</td><td>Large digital examples from text, images, speech, clicks, sensors, maps, transactions, and videos.</td><td>Models can learn patterns instead of depending only on hand-written rules.</td><td>A vision model can learn from millions of labeled images instead of a programmer writing rules for eyes, ears, edges, and shapes.</td></tr>
          <tr><td>Compute</td><td>GPUs, TPUs, cloud clusters, and cheaper parallel processing.</td><td>Training large models requires huge matrix calculations. Parallel hardware makes experiments feasible.</td><td>A neural network that would take months on weak hardware can be trained much faster on GPU clusters.</td></tr>
          <tr><td>Algorithms</td><td>Better search, optimization, learning architectures, attention, regularization, and training methods.</td><td>Algorithms decide how data and compute become useful intelligence instead of noise or memorization.</td><td>A* uses g+h to guide search; learning systems use optimization to find parameters that reduce error.</td></tr>
        </tbody>
      </table>
      <div class="teacher-board"><strong>Teacher-style takeaway:</strong> Data is experience, compute is the capacity to process experience, and algorithms are the method of learning or deciding from that experience. Remove any one of the three and modern AI becomes much weaker.</div>
    </section>
    <section class="notebook-section">
      <h5>4. The four perspectives of AI</h5>
      <p>The lecture used a 2 x 2 matrix. The row asks whether we care about thought or behavior. The column asks whether we compare with humans or with rationality.</p>
      <table class="lecture-table">
        <thead><tr><th>Perspective</th><th>Main question</th><th>What it values</th><th>Weakness</th></tr></thead>
        <tbody>
          <tr><td>Thinking humanly</td><td>Can machines think like humans?</td><td>Cognitive modeling, psychology, human mental processes.</td><td>Human thinking is hard to observe and not always rational.</td></tr>
          <tr><td>Acting humanly</td><td>Can machines behave like humans?</td><td>Turing-test style behavior, natural conversation, human-like performance.</td><td>Mimicking humans can also mimic human bias and mistakes.</td></tr>
          <tr><td>Thinking rationally</td><td>Can machines reason correctly?</td><td>Logic, valid inference, laws of thought.</td><td>Perfect reasoning can be computationally expensive or impossible in uncertain worlds.</td></tr>
          <tr><td>Acting rationally</td><td>Can machines choose the best action?</td><td>Perception, action, goals, utility, expected outcome.</td><td>Requires careful performance measures and may still face uncertainty.</td></tr>
        </tbody>
      </table>
      <p>The course mainly moves toward acting rationally. That means the system should not merely copy humans. It should perceive the world and act in a way that is expected to achieve the best outcome.</p>
    </section>
    <div class="notebook-grid">
      <section class="notebook-section">
        <h5>5. Rational agent in plain language</h5>
        <p>An agent is anything that perceives and acts. A rational agent chooses actions that are expected to maximize its goal achievement, given what it has perceived and what it knows.</p>
        <p>Rationality is not the same as perfection. If the agent does not know future traffic, it cannot guarantee the fastest route. But it can choose the route that is best according to available evidence.</p>
        <ul>
          <li><strong>Percept:</strong> input received from the environment.</li>
          <li><strong>Action:</strong> output that affects the environment.</li>
          <li><strong>Goal:</strong> what the agent is trying to achieve.</li>
          <li><strong>Expected outcome:</strong> best predicted result under uncertainty.</li>
        </ul>
      </section>
      <section class="notebook-section">
        <h5>6. Risks of AI explained</h5>
        <p>The teacher did not treat AI as automatically good. The risks discussed are connected to the agent idea: if a system can perceive and act at scale, wrong goals or wrong data can cause serious harm.</p>
        <ul>
          <li><strong>Autonomous weapons:</strong> agents that can select and attack targets without human intervention.</li>
          <li><strong>Surveillance and persuasion:</strong> AI can monitor and influence people at scale.</li>
          <li><strong>Bias:</strong> if data reflects unfair human decisions, acting-humanly systems may reproduce unfairness.</li>
          <li><strong>Employment and inequality:</strong> AI may increase productivity while shifting wealth toward capital owners.</li>
          <li><strong>Safety-critical failures:</strong> wrong AI decisions in medicine, transport, or infrastructure can harm lives.</li>
          <li><strong>Cybersecurity:</strong> AI can create new attack surfaces and help build weak systems faster.</li>
        </ul>
      </section>
    </div>
    <section class="worked-example">
      <h5>Worked answer: Why does the course prefer rational agents?</h5>
      <p>Acting humanly is not enough because humans are not always correct or fair. Thinking rationally is attractive, but full logical reasoning can be computationally infeasible and weak under uncertainty. Acting rationally is practical because it focuses on choosing actions that best achieve goals given available information. This is why the course moves next into agents, PEAS, environments, and search.</p>
    </section>
    <section class="remember-box">
      <h5>CS1 memory checklist</h5>
      <ul>
        <li>AI is old; recent success comes from data + compute + algorithms.</li>
        <li>The four AI views are thinking humanly, acting humanly, thinking rationally, acting rationally.</li>
        <li>This course mainly follows the rational-agent approach.</li>
        <li>Rational means best expected action, not perfect action.</li>
        <li>AI risk is tied to scale, autonomy, data bias, and poorly defined goals.</li>
      </ul>
    </section>
  `,
  cs2: `
    <div class="notebook-intro">
      <h4>Full lecture notebook: CS2 intelligent agents</h4>
      <p>CS2 explains how to describe an AI system before trying to solve it. The teacher's flow was: agent definition -> PEAS -> environment types -> agent architectures -> problem-solving agent.</p>
    </div>
    <section class="notebook-section">
      <h5>1. Agent definition and agent function</h5>
      <p>An agent perceives its environment through sensors and acts upon the environment through actuators. This is the basic loop.</p>
      <div class="flow-strip"><span>Environment</span><span>Sensors</span><span>Percepts</span><span>Agent program</span><span>Actuators</span><span>Actions</span></div>
      <p>The agent function maps percept history to actions. The agent program is the actual implementation running on a machine. In simple examples we may use only the current percept, but in real environments the percept history often matters.</p>
    </section>
    <section class="notebook-section">
      <h5>2. PEAS in detail</h5>
      <p>PEAS is a disciplined way to specify the task environment. It prevents vague thinking. If PEAS is unclear, the agent design will be unclear.</p>
      <table class="lecture-table">
        <thead><tr><th>PEAS part</th><th>Question to ask</th><th>Why it matters</th></tr></thead>
        <tbody>
          <tr><td>Performance</td><td>What counts as success?</td><td>Defines rational behavior. A wrong measure creates wrong optimization.</td></tr>
          <tr><td>Environment</td><td>What world does the agent operate in?</td><td>Determines uncertainty, other agents, possible states, and constraints.</td></tr>
          <tr><td>Actuators</td><td>What can the agent do?</td><td>Limits the action space. The agent cannot choose actions it cannot execute.</td></tr>
          <tr><td>Sensors</td><td>What can the agent perceive?</td><td>Limits available information. Hidden state may require memory or inference.</td></tr>
        </tbody>
      </table>
    </section>
    <div class="notebook-grid">
      <section class="worked-example">
        <h5>Example: Medical diagnosis system</h5>
        <ul>
          <li><strong>Performance:</strong> healthy patient, low cost, correct diagnosis, safe treatment, minimal legal risk.</li>
          <li><strong>Environment:</strong> patient, hospital, doctors, staff, tests, medical history.</li>
          <li><strong>Actuators:</strong> ask questions, order tests, suggest diagnosis, recommend treatment or referral.</li>
          <li><strong>Sensors:</strong> symptoms, patient answers, test results, doctor observations, stored records.</li>
        </ul>
        <p>This environment is partially observable and stochastic because the system never sees the full biological state and treatments may have uncertain outcomes.</p>
      </section>
      <section class="worked-example">
        <h5>Example: Part-picking robot</h5>
        <ul>
          <li><strong>Performance:</strong> percentage of parts placed in correct bins, speed, low damage.</li>
          <li><strong>Environment:</strong> conveyor belt, parts, bins, lighting, nearby workspace.</li>
          <li><strong>Actuators:</strong> robotic arm, gripper, conveyor control.</li>
          <li><strong>Sensors:</strong> camera, joint angle sensors, force sensors.</li>
        </ul>
        <p>This can be dynamic because the belt moves while the robot decides. It may be continuous because positions and motions are not just discrete symbols.</p>
      </section>
    </div>
    <section class="notebook-section">
      <h5>3. Environment classification table</h5>
      <table class="lecture-table">
        <thead><tr><th>Property</th><th>Meaning</th><th>Easy example</th><th>Hard example</th></tr></thead>
        <tbody>
          <tr><td>Observable</td><td>Whether the agent sees the complete state.</td><td>Chess board is visible.</td><td>Poker hides opponent cards.</td></tr>
          <tr><td>Deterministic</td><td>Whether action outcome is fully predictable.</td><td>Calculator operation.</td><td>Weather, traffic, robot soccer.</td></tr>
          <tr><td>Episodic</td><td>Whether each decision is independent.</td><td>Classifying one image.</td><td>Driving, where one action affects the next.</td></tr>
          <tr><td>Static</td><td>Whether world waits while agent thinks.</td><td>Crossword puzzle.</td><td>Autonomous driving.</td></tr>
          <tr><td>Discrete</td><td>Whether states/actions are countable.</td><td>Tic-tac-toe.</td><td>Robot arm movement.</td></tr>
          <tr><td>Single-agent</td><td>Whether only one agent matters.</td><td>Solving a puzzle.</td><td>Chess, markets, roads.</td></tr>
        </tbody>
      </table>
    </section>
    <section class="notebook-section">
      <h5>4. Agent architectures in detail</h5>
      <table class="lecture-table">
        <thead><tr><th>Agent type</th><th>How it decides</th><th>Strength</th><th>Weakness</th></tr></thead>
        <tbody>
          <tr><td>Table-driven</td><td>Looks up action for percept history.</td><td>Simple concept.</td><td>Impossible table size for real tasks.</td></tr>
          <tr><td>Simple reflex</td><td>If condition then action.</td><td>Fast and easy.</td><td>No memory; fails when current percept is insufficient.</td></tr>
          <tr><td>Model-based reflex</td><td>Maintains internal state/model of world.</td><td>Handles partial observability better.</td><td>Needs a correct model update.</td></tr>
          <tr><td>Goal-based</td><td>Chooses actions that reach a goal.</td><td>Flexible; can plan.</td><td>May not compare quality among goals.</td></tr>
          <tr><td>Utility-based</td><td>Chooses action with best utility or expected utility.</td><td>Handles trade-offs and uncertainty.</td><td>Utility design can be difficult.</td></tr>
          <tr><td>Learning</td><td>Improves from feedback/experience.</td><td>Adapts over time.</td><td>Needs data, feedback, and safeguards.</td></tr>
        </tbody>
      </table>
    </section>
    <section class="worked-example">
      <h5>Worked classification: autonomous taxi</h5>
      <p>A taxi is partially observable because it cannot know everything about nearby drivers and pedestrians. It is stochastic because other agents behave unpredictably. It is sequential because one lane change affects future choices. It is dynamic because the world changes while the agent computes. It is continuous because speed, position, and steering vary continuously. It is multi-agent because other drivers and pedestrians matter.</p>
      <p>This is why a simple reflex taxi is not enough. It needs model-based state estimation, goal-based route planning, utility-based trade-offs, and learning from experience.</p>
    </section>
    <section class="remember-box">
      <h5>CS2 memory checklist</h5>
      <ul>
        <li>Always write PEAS before proposing an AI solution.</li>
        <li>Performance measure defines what rational means.</li>
        <li>Environment type tells you how hard the agent design is.</li>
        <li>Simple reflex is current-percept only; model-based adds memory.</li>
        <li>Goal-based agents lead naturally to search, which is CS3.</li>
      </ul>
    </section>
  `,
  cs3: `
    <div class="notebook-intro">
      <h4>Full lecture notebook: CS3 problem formulation and search</h4>
      <p>CS3 is where the agent starts solving. The teacher's key message: first model the real problem as a search problem, then choose the algorithm based on what information and guarantees you have.</p>
    </div>
    <section class="notebook-section">
      <h5>1. Problem-solving agent flow</h5>
      <div class="flow-strip"><span>Goal</span><span>Formulate problem</span><span>Search</span><span>Return action sequence</span><span>Execute</span></div>
      <p>A problem-solving agent does not directly act randomly. It receives a goal, formulates a problem, searches for a sequence of actions, and then executes the chosen sequence.</p>
      <p>The teacher connected this to early AI: many AI tasks were handled by converting real-world tasks into state-space search.</p>
    </section>
    <section class="notebook-section">
      <h5>2. Formal components of a search problem</h5>
      <table class="lecture-table">
        <thead><tr><th>Component</th><th>Meaning</th><th>8-puzzle example</th><th>Route example</th></tr></thead>
        <tbody>
          <tr><td>State space</td><td>All possible states.</td><td>All tile arrangements.</td><td>All cities/locations.</td></tr>
          <tr><td>Initial state</td><td>Where the problem begins.</td><td>Given starting board.</td><td>Starting city.</td></tr>
          <tr><td>Actions</td><td>Legal moves.</td><td>Move blank up/down/left/right.</td><td>Take a road to neighbor city.</td></tr>
          <tr><td>Transition model</td><td>Result of an action.</td><td>New tile arrangement.</td><td>New city after travel.</td></tr>
          <tr><td>Goal test</td><td>Check if goal reached.</td><td>Tiles in goal order.</td><td>At destination.</td></tr>
          <tr><td>Path cost</td><td>Total cost of actions.</td><td>Number of moves.</td><td>Distance, time, fuel, toll.</td></tr>
        </tbody>
      </table>
    </section>
    <section class="notebook-section">
      <h5>3. Tree search vs graph search</h5>
      <p>Tree search treats each path as separate, even if two paths reach the same state. Graph search remembers explored states, so it can avoid repeating work.</p>
      <p>This matters because many state spaces contain cycles. Without an explored set, an algorithm can revisit the same states repeatedly.</p>
      <div class="teacher-board"><strong>Classroom trick:</strong> Whenever you solve by hand, keep two things: frontier and explored. Frontier shows what can be expanded next; explored shows what has already been expanded.</div>
    </section>
    <section class="notebook-section">
      <h5>4. Uninformed search strategies</h5>
      <table class="lecture-table">
        <thead><tr><th>Algorithm</th><th>Frontier rule</th><th>Complete?</th><th>Optimal?</th><th>Memory idea</th></tr></thead>
        <tbody>
          <tr><td>BFS</td><td>FIFO queue, shallowest first.</td><td>Yes if branching finite.</td><td>Yes for equal step costs.</td><td>High; stores many frontier nodes.</td></tr>
          <tr><td>DFS</td><td>LIFO stack, deepest first.</td><td>No in infinite-depth spaces.</td><td>No.</td><td>Low compared with BFS.</td></tr>
          <tr><td>DLS</td><td>DFS with depth limit.</td><td>Only if goal within limit.</td><td>No generally.</td><td>Low.</td></tr>
          <tr><td>IDS</td><td>DLS repeated with increasing limits.</td><td>Yes if branching finite.</td><td>Yes for unit/equal costs.</td><td>DFS-like memory.</td></tr>
          <tr><td>UCS</td><td>Priority queue by g(n).</td><td>Yes for positive step costs.</td><td>Yes for positive step costs.</td><td>Can be high.</td></tr>
        </tbody>
      </table>
    </section>
    <section class="notebook-section">
      <h5>5. Informed search strategies</h5>
      <p>Informed search uses extra knowledge, usually h(n), an estimate of distance or cost to goal.</p>
      <table class="lecture-table">
        <thead><tr><th>Algorithm</th><th>Priority</th><th>Meaning</th><th>Main risk</th></tr></thead>
        <tbody>
          <tr><td>Greedy Best-First</td><td>Smallest h(n)</td><td>Choose what looks closest to goal.</td><td>Can ignore expensive path already taken.</td></tr>
          <tr><td>A*</td><td>Smallest f(n)=g(n)+h(n)</td><td>Balance cost so far and estimated cost remaining.</td><td>Needs good heuristic for guarantees.</td></tr>
        </tbody>
      </table>
    </section>
    <section class="worked-example">
      <h5>Worked mini-example: how to expand by algorithm</h5>
      <p>Suppose from A we can reach B with cost 2 and h=6, C with cost 4 and h=4, and D with cost 7 and h=6.</p>
      <ul>
        <li><strong>BFS:</strong> B, C, D are all depth 1. Expand in insertion/order rule, usually B first.</li>
        <li><strong>DFS:</strong> depends on stack push order. If D is on top, expand D first.</li>
        <li><strong>UCS:</strong> compare g: B=2, C=4, D=7. Expand B.</li>
        <li><strong>Greedy:</strong> compare h: B=6, C=4, D=6. Expand C.</li>
        <li><strong>A*:</strong> compare f: B=8, C=8, D=13. Tie between B and C; use the stated tie rule.</li>
      </ul>
    </section>
    <section class="remember-box">
      <h5>CS3 memory checklist</h5>
      <ul>
        <li>Problem formulation has six parts: states, initial state, actions, transition, goal test, path cost.</li>
        <li>Frontier rule determines the algorithm.</li>
        <li>BFS uses queue; DFS uses stack; UCS uses g; Greedy uses h; A* uses g+h.</li>
        <li>Do not claim optimality without checking the assumptions.</li>
      </ul>
    </section>
  `,
  cs4: `
    <div class="notebook-intro">
      <h4>Full lecture notebook: CS4 heuristics and A*</h4>
      <p>CS4 explains why uninformed search is too expensive and how heuristics guide search while preserving guarantees when designed carefully.</p>
    </div>
    <section class="notebook-section">
      <h5>1. Why heuristics are needed</h5>
      <p>Blind search can explode because each node may generate multiple successors. If branching factor is b and depth is d, the number of nodes can grow very quickly. This is why puzzles like 15-puzzle are hard for BFS/DFS.</p>
      <p>A heuristic is a practical estimate of remaining cost. It does not solve the problem fully; it gives direction.</p>
      <div class="flow-strip"><span>Current state n</span><span>h(n)</span><span>estimated cost to goal</span><span>guided expansion</span></div>
    </section>
    <section class="notebook-section">
      <h5>2. 8-puzzle heuristics explained</h5>
      <table class="lecture-table">
        <thead><tr><th>Heuristic</th><th>How to compute</th><th>Why admissible</th><th>Weakness</th></tr></thead>
        <tbody>
          <tr><td>h1: misplaced tiles</td><td>Count tiles not in goal position, ignoring blank.</td><td>Each misplaced tile must move at least once.</td><td>Does not know how far a tile is.</td></tr>
          <tr><td>h2: Manhattan distance</td><td>For each tile, add row distance + column distance to goal position.</td><td>Each tile must move at least that many grid steps.</td><td>Still ignores interactions between tiles.</td></tr>
        </tbody>
      </table>
      <p>h2 usually dominates h1 because h2 gives at least as much information while still staying admissible.</p>
    </section>
    <section class="notebook-section">
      <h5>3. A* evaluation function</h5>
      <p>A* chooses the node with lowest f(n).</p>
      <div class="flow-strip"><span>g(n): cost so far</span><span>h(n): cost estimate</span><span>f(n)=g(n)+h(n)</span></div>
      <p>UCS only uses g(n), so it can search broadly. Greedy only uses h(n), so it can be misled. A* combines both.</p>
    </section>
    <section class="notebook-section">
      <h5>4. Admissibility and consistency</h5>
      <table class="lecture-table">
        <thead><tr><th>Property</th><th>Formula</th><th>Meaning</th><th>How to test</th></tr></thead>
        <tbody>
          <tr><td>Admissible</td><td>0 <= h(n) <= h*(n)</td><td>Never overestimates true remaining cost.</td><td>Compare h(n) with actual cost to goal, if known.</td></tr>
          <tr><td>Consistent</td><td>h(n) <= c(n,n') + h(n')</td><td>Triangle inequality style rule for every edge.</td><td>Check every edge from parent to successor.</td></tr>
        </tbody>
      </table>
      <p>Consistency is stronger for graph search because it prevents f-values from behaving badly along paths.</p>
    </section>
    <section class="notebook-section">
      <h5>5. Relaxed problems and pattern databases</h5>
      <p>A relaxed problem removes one or more constraints. Since the relaxed problem is easier, its solution cost is a lower bound on the real problem. That lower bound can be an admissible heuristic.</p>
      <p>A pattern database stores exact solution costs for parts or abstractions of a problem. During search, the system looks up a precomputed estimate instead of recomputing from scratch.</p>
    </section>
    <section class="worked-example">
      <h5>Worked consistency check</h5>
      <p>Suppose h(A)=10, edge A to B costs 6, and h(B)=5. Check h(A) <= cost(A,B) + h(B).</p>
      <p>That is 10 <= 6 + 5, so 10 <= 11. This edge passes consistency. If h(A)=13, then 13 <= 11 would fail.</p>
    </section>
    <section class="remember-box">
      <h5>CS4 memory checklist</h5>
      <ul>
        <li>Heuristic h(n) estimates cost from n to goal.</li>
        <li>A* uses f(n)=g(n)+h(n).</li>
        <li>Admissible means no overestimate.</li>
        <li>Consistent means every edge satisfies h(n) <= cost + h(successor).</li>
        <li>Relaxed problems are a standard way to design admissible heuristics.</li>
      </ul>
    </section>
  `,
  cs5: `
    <div class="notebook-intro">
      <h4>Full lecture notebook: CS5 local search and evolutionary algorithms</h4>
      <p>CS5 changes the search philosophy. Earlier, the path to a goal mattered. In local search, the final configuration itself is the solution.</p>
    </div>
    <section class="notebook-section">
      <h5>1. Local search idea</h5>
      <p>In many optimization problems, we do not care how the algorithm arrived at the answer. We only care whether the final state is good. This lets us keep very little memory.</p>
      <table class="lecture-table">
        <thead><tr><th>Path search</th><th>Local search</th></tr></thead>
        <tbody>
          <tr><td>Solution is an action sequence/path.</td><td>Solution is a state/configuration.</td></tr>
          <tr><td>Maintains frontier of paths.</td><td>Maintains current state or population.</td></tr>
          <tr><td>Examples: route planning, puzzle path.</td><td>Examples: 8-queens, scheduling, tuning.</td></tr>
        </tbody>
      </table>
    </section>
    <section class="notebook-section">
      <h5>2. 8-queens formulation</h5>
      <p>A common representation is one queen per column. The state is an array where each value gives the queen's row in that column. The objective is to minimize attacking pairs.</p>
      <ul>
        <li><strong>State:</strong> complete board with 8 queens.</li>
        <li><strong>Neighbor:</strong> move one queen within its column.</li>
        <li><strong>Cost:</strong> number of conflicts.</li>
        <li><strong>Fitness:</strong> often maximum non-attacking pairs minus conflicts.</li>
      </ul>
    </section>
    <section class="notebook-section">
      <h5>3. Hill climbing variants</h5>
      <table class="lecture-table">
        <thead><tr><th>Variant</th><th>Rule</th><th>Why use it</th></tr></thead>
        <tbody>
          <tr><td>Steepest ascent</td><td>Evaluate all neighbors, pick best improvement.</td><td>Strong local improvement.</td></tr>
          <tr><td>First-choice</td><td>Generate neighbors until one improves.</td><td>Useful when many neighbors exist.</td></tr>
          <tr><td>Stochastic</td><td>Choose randomly among improving moves, often weighted.</td><td>Avoids deterministic behavior.</td></tr>
          <tr><td>Random restart</td><td>Start again from new random states.</td><td>Escapes local optima by trying new hills.</td></tr>
        </tbody>
      </table>
    </section>
    <section class="notebook-section">
      <h5>4. Problems in local search</h5>
      <ul>
        <li><strong>Local optimum:</strong> current state is better than neighbors, but not globally best.</li>
        <li><strong>Plateau:</strong> many neighbors have same value, so there is no clear direction.</li>
        <li><strong>Ridge:</strong> improvement requires a sequence of sideways or temporarily worse moves.</li>
      </ul>
      <p>These problems explain why algorithms like simulated annealing and beam search are introduced.</p>
    </section>
    <section class="notebook-section">
      <h5>5. Simulated annealing</h5>
      <p>Simulated annealing sometimes accepts worse moves. This sounds strange, but it helps escape local traps. The probability of accepting a worse move is higher when temperature is high and lower when temperature is low.</p>
      <div class="flow-strip"><span>High temperature</span><span>explore</span><span>cool down</span><span>exploit</span><span>stable solution</span></div>
    </section>
    <section class="notebook-section">
      <h5>6. Local beam search</h5>
      <p>Local beam search keeps K states instead of one. It generates successors of all K states and keeps the best K. The teacher compared it to parallel hill climbing, but the important difference is that beam search can share selection pressure across states.</p>
      <p>If K=1, it becomes hill climbing. If K is too large, it becomes expensive. If all beams become similar, the algorithm loses diversity.</p>
    </section>
    <section class="notebook-section">
      <h5>7. Genetic algorithms</h5>
      <table class="lecture-table">
        <thead><tr><th>Step</th><th>Meaning in 8-queens</th></tr></thead>
        <tbody>
          <tr><td>Representation</td><td>Array of queen row positions.</td></tr>
          <tr><td>Initial population</td><td>Random boards.</td></tr>
          <tr><td>Fitness</td><td>Higher score for fewer attacking pairs.</td></tr>
          <tr><td>Selection</td><td>Better boards more likely to become parents.</td></tr>
          <tr><td>Crossover</td><td>Combine first part of one board with second part of another.</td></tr>
          <tr><td>Mutation</td><td>Randomly change a queen row to preserve diversity.</td></tr>
        </tbody>
      </table>
    </section>
    <section class="notebook-section">
      <h5>8. Ant Colony Optimization</h5>
      <p>ACO is inspired by how ants find paths. Individual ants explore. Good paths get pheromone. More pheromone makes future ants more likely to choose that path. Pheromone evaporation prevents early bad paths from dominating forever.</p>
      <p>Conceptually, ACO is useful for path and combinatorial optimization problems where many agents can explore and leave shared feedback.</p>
    </section>
    <section class="remember-box">
      <h5>CS5 memory checklist</h5>
      <ul>
        <li>Local search uses complete states as candidate solutions.</li>
        <li>Hill climbing can get stuck; restarts and annealing help.</li>
        <li>Beam search keeps K candidates.</li>
        <li>GA uses selection, crossover, mutation.</li>
        <li>ACO uses pheromone as shared search memory.</li>
      </ul>
    </section>
  `,
  webinar1: `
    <div class="notebook-intro">
      <h4>Full lecture notebook: Webinar 1 A* practice</h4>
      <p>The webinar focused on practical informed search, especially A*, admissibility, consistency, and memory-aware variants like IDA*.</p>
    </div>
    <section class="notebook-section">
      <h5>1. Uninformed vs informed search</h5>
      <p>Uninformed search explores without knowing how close a state is to the goal. Informed search uses heuristic information. The webinar listed BFS, DFS, DLS, IDS, and UCS as uninformed, and Greedy, A*, IDA*, and related variants as informed.</p>
    </section>
    <section class="notebook-section">
      <h5>2. A* formula and meaning</h5>
      <div class="flow-strip"><span>g(n): cost to reach n</span><span>h(n): expected cost to goal</span><span>f(n): total estimate</span></div>
      <p>A* expands the node with smallest f(n)=g(n)+h(n). This makes it different from UCS and Greedy:</p>
      <ul>
        <li>UCS ignores h(n), so it may explore too broadly.</li>
        <li>Greedy ignores g(n), so it may chase misleading closeness.</li>
        <li>A* combines both, so it is often efficient and optimal under correct conditions.</li>
      </ul>
    </section>
    <section class="notebook-section">
      <h5>3. Open list and closed list</h5>
      <p>The open list contains generated nodes waiting to be expanded. The closed list contains expanded nodes. In each step, pick the open node with minimum f.</p>
      <p>When solving by hand, always maintain a table with node, parent, g, h, f, open, and closed. Do not mentally skip this table.</p>
    </section>
    <section class="worked-example">
      <h5>Worked A* step pattern</h5>
      <ol>
        <li>Put start node in open with g=0 and f=h(start).</li>
        <li>Select node with smallest f from open.</li>
        <li>If it is goal, stop and reconstruct path.</li>
        <li>Otherwise expand it and compute each child's g, h, and f.</li>
        <li>If a child is new, add it to open. If it was seen with a worse g, update it.</li>
        <li>Move expanded node to closed.</li>
      </ol>
    </section>
    <section class="notebook-section">
      <h5>4. Admissibility and consistency in webinar terms</h5>
      <table class="lecture-table">
        <thead><tr><th>Concept</th><th>Meaning</th><th>Student mistake</th></tr></thead>
        <tbody>
          <tr><td>Admissible</td><td>h never overestimates true remaining cost.</td><td>Checking only one node instead of all relevant nodes.</td></tr>
          <tr><td>Consistency</td><td>Every edge obeys h(n) <= cost + h(successor).</td><td>Checking only start-to-goal instead of each edge.</td></tr>
          <tr><td>Triangle inequality</td><td>Direct estimate cannot exceed one step plus next estimate.</td><td>Forgetting to include edge cost.</td></tr>
        </tbody>
      </table>
    </section>
    <section class="notebook-section">
      <h5>5. IDA*</h5>
      <p>IDA* means Iterative Deepening A*. It is like depth-first search controlled by an f-cost threshold. It avoids storing a huge open list, so it is memory-friendly.</p>
      <p>The trade-off is repeated work. It may revisit states across thresholds. But when memory is the main limitation, this trade-off can be worthwhile.</p>
    </section>
    <section class="remember-box">
      <h5>Webinar memory checklist</h5>
      <ul>
        <li>A* priority is f=g+h.</li>
        <li>Stop when goal is selected for expansion in standard A*.</li>
        <li>Admissible: no overestimate.</li>
        <li>Consistent: check every edge.</li>
        <li>IDA* uses f-threshold iterative deepening to save memory.</li>
      </ul>
    </section>
  `
};

let activeLectureKey = "cs1";
let activeMapNode = "ai-foundation";

function renderVisualMap(key, nodeId) {
  const map = lectureMaps[key];
  if (!map) {
    $("#visualMap").innerHTML = "";
    return;
  }
  const activeId = nodeId || map.nodes[0].id;
  activeMapNode = activeId;
  const nodeLookup = Object.fromEntries(map.nodes.map((node) => [node.id, node]));
  const links = map.links.map(([from, to]) => {
    const a = nodeLookup[from];
    const b = nodeLookup[to];
    const active = from === activeId || to === activeId;
    return `
      <line class="map-link ${active ? "active" : ""}" x1="${a.x}%" y1="${a.y}%" x2="${b.x}%" y2="${b.y}%"></line>
    `;
  }).join("");
  const nodes = map.nodes.map((node) => `
    <button class="map-node ${node.type || ""} ${node.id === activeId ? "active" : ""}" data-map-node="${node.id}" style="left:${node.x}%;top:${node.y}%">
      ${node.label}
    </button>
  `).join("");
  const activeNode = nodeLookup[activeId] || map.nodes[0];
  $("#visualMap").innerHTML = `
    <div class="map-canvas" aria-label="${map.title}">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${links}</svg>
      ${nodes}
    </div>
    <aside class="map-detail">
      <p class="eyebrow">${map.title}</p>
      <h4>${activeNode.label}</h4>
      <p>${activeNode.summary}</p>
      <ul>${activeNode.details.map((detail) => `<li>${detail}</li>`).join("")}</ul>
      <div class="map-detail-box">${activeNode.example}</div>
    </aside>
  `;
  $$("#visualMap .map-node").forEach((button) => {
    button.addEventListener("click", () => renderVisualMap(activeLectureKey, button.dataset.mapNode));
  });
}

function renderLecture(key) {
  const lecture = lectureNotes[key];
  if (!lecture) return;
  activeLectureKey = key;
  activeMapNode = lectureMaps[key]?.nodes[0].id || "";
  $("#lectureMeta").textContent = lecture.meta;
  $("#lectureTitle").textContent = lecture.title;
  $("#rawTranscriptLink").href = lectureTranscriptLinks[key] || "#";
  renderVisualMap(key, activeMapNode);
  $("#lectureNotebook").innerHTML = lectureBooks[key] || "";
  $("#lectureBody").innerHTML = `${lecture.body}${lectureDeepDives[key] || ""}`;
  $$(".lecture-card").forEach((card) => {
    card.classList.toggle("active", card.dataset.lecture === key);
  });
}

$$(".lecture-card").forEach((card) => {
  card.addEventListener("click", () => renderLecture(card.dataset.lecture));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      renderLecture(card.dataset.lecture);
    }
  });
});

$("#jumpDeep").addEventListener("click", () => {
  const deep = $("#lectureBody .deep-dive");
  if (deep) deep.scrollIntoView({ behavior: "smooth", block: "start" });
});

$("#jumpNotebook").addEventListener("click", () => {
  const notebook = $("#lectureNotebook");
  if (notebook) notebook.scrollIntoView({ behavior: "smooth", block: "start" });
});

$("#jumpMap").addEventListener("click", () => {
  const map = $("#visualMap");
  if (map) map.scrollIntoView({ behavior: "smooth", block: "start" });
});

renderLecture("cs1");

const graphNodes = {
  A: { x: 10, y: 48, h: 7 },
  B: { x: 27, y: 20, h: 6 },
  C: { x: 32, y: 72, h: 4 },
  D: { x: 50, y: 42, h: 6 },
  E: { x: 64, y: 16, h: 2 },
  F: { x: 66, y: 68, h: 4 },
  G: { x: 88, y: 44, h: 0 }
};

const graphEdges = [
  ["A", "B", 2],
  ["A", "C", 4],
  ["A", "D", 7],
  ["B", "D", 3],
  ["B", "E", 5],
  ["C", "D", 2],
  ["C", "F", 2],
  ["D", "E", 2],
  ["D", "F", 3],
  ["E", "G", 3],
  ["F", "G", 5]
];

const algorithmInfo = {
  bfs: {
    title: "Breadth First Search",
    summary: "Queue based search that expands shallowest paths first.",
    frontier: "FIFO queue: first discovered, first expanded."
  },
  dfs: {
    title: "Depth First Search",
    summary: "Stack based search that follows one path deeply before backtracking.",
    frontier: "LIFO stack: newest path is expanded first."
  },
  ucs: {
    title: "Uniform Cost Search",
    summary: "Expands the lowest path-cost g(n). It is optimal with positive step costs.",
    frontier: "Priority queue ordered by g(n)."
  },
  ids: {
    title: "Iterative Deepening Search",
    summary: "Runs depth-limited DFS repeatedly with increasing depth limits.",
    frontier: "DFS stack, restarted for each depth limit."
  },
  greedy: {
    title: "Greedy Best-First Search",
    summary: "Expands the node that appears closest to the goal by h(n). Fast, but not guaranteed optimal.",
    frontier: "Priority queue ordered by h(n)."
  },
  astar: {
    title: "A* Search",
    summary: "Expands the lowest f(n)=g(n)+h(n). With disciplined heuristics, it finds an optimal path.",
    frontier: "Priority queue ordered by f(n)."
  }
};

const adjacency = Object.fromEntries(Object.keys(graphNodes).map((node) => [node, []]));
for (const [from, to, cost] of graphEdges) {
  adjacency[from].push({ node: to, cost });
  adjacency[to].push({ node: from, cost });
}
for (const node of Object.keys(adjacency)) {
  adjacency[node].sort((a, b) => a.node.localeCompare(b.node));
}

let searchAlgorithm = "bfs";
let searchSteps = [];
let searchIndex = 0;
let playTimer = null;

function cloneFrontier(frontier) {
  return frontier.map((item) => ({ ...item, path: [...item.path] }));
}

function frontierScore(item, algo) {
  if (algo === "ucs") return item.cost;
  if (algo === "greedy") return graphNodes[item.node].h;
  if (algo === "astar") return item.cost + graphNodes[item.node].h;
  return item.depth;
}

function sortFrontier(frontier, algo) {
  if (!["ucs", "greedy", "astar"].includes(algo)) return;
  frontier.sort((a, b) => {
    const score = frontierScore(a, algo) - frontierScore(b, algo);
    if (score !== 0) return score;
    return a.node.localeCompare(b.node);
  });
}

function recordStep(steps, payload) {
  steps.push({
    current: payload.current || null,
    frontier: cloneFrontier(payload.frontier || []),
    explored: Array.from(payload.explored || []),
    path: payload.path || [],
    message: payload.message || "",
    limit: payload.limit
  });
}

function makeSearchSteps(algo) {
  if (algo === "ids") return makeIdsSteps();
  const steps = [];
  const explored = new Set();
  const bestCost = { A: 0 };
  const frontier = [{ node: "A", path: ["A"], cost: 0, depth: 0 }];
  recordStep(steps, {
    frontier,
    explored,
    message: `Initialize ${algorithmInfo[algo].frontier} Start at A.`
  });

  while (frontier.length) {
    sortFrontier(frontier, algo);
    const current = algo === "dfs" ? frontier.pop() : frontier.shift();
    if (explored.has(current.node)) continue;
    explored.add(current.node);
    recordStep(steps, {
      current: current.node,
      frontier,
      explored,
      path: current.path,
      message: `Expand ${current.node}. g=${current.cost}, h=${graphNodes[current.node].h}, f=${current.cost + graphNodes[current.node].h}.`
    });

    if (current.node === "G") {
      recordStep(steps, {
        current: "G",
        frontier,
        explored,
        path: current.path,
        message: `Goal found. Path ${current.path.join(" -> ")} costs ${current.cost}.`
      });
      break;
    }

    const neighbors = algo === "dfs" ? [...adjacency[current.node]].reverse() : adjacency[current.node];
    for (const edge of neighbors) {
      if (explored.has(edge.node)) continue;
      const nextCost = current.cost + edge.cost;
      const existing = frontier.find((item) => item.node === edge.node);
      const shouldAdd = !existing;
      const shouldReplace = existing && ["ucs", "greedy", "astar"].includes(algo) && nextCost < existing.cost;
      if (shouldAdd || shouldReplace) {
        const next = {
          node: edge.node,
          path: [...current.path, edge.node],
          cost: nextCost,
          depth: current.depth + 1
        };
        if (shouldReplace) frontier.splice(frontier.indexOf(existing), 1, next);
        else frontier.push(next);
        bestCost[edge.node] = Math.min(bestCost[edge.node] ?? Infinity, nextCost);
      }
    }
    sortFrontier(frontier, algo);
    recordStep(steps, {
      current: current.node,
      frontier,
      explored,
      path: current.path,
      message: `Add valid successors of ${current.node} to the frontier, then apply ${algorithmInfo[algo].frontier}`
    });
  }
  return steps;
}

function makeIdsSteps() {
  const steps = [];
  for (let limit = 0; limit <= 5; limit++) {
    const frontier = [{ node: "A", path: ["A"], cost: 0, depth: 0 }];
    const explored = new Set();
    recordStep(steps, {
      frontier,
      explored,
      limit,
      message: `Start a depth-limited DFS pass with limit ${limit}.`
    });
    while (frontier.length) {
      const current = frontier.pop();
      const key = `${current.node}-${current.depth}-${limit}`;
      explored.add(key);
      recordStep(steps, {
        current: current.node,
        frontier,
        explored: new Set(Array.from(explored).map((item) => item.split("-")[0])),
        path: current.path,
        limit,
        message: `Limit ${limit}: expand ${current.node} at depth ${current.depth}.`
      });
      if (current.node === "G") {
        recordStep(steps, {
          current: "G",
          frontier,
          explored: new Set(Array.from(explored).map((item) => item.split("-")[0])),
          path: current.path,
          limit,
          message: `Goal found by IDS at depth limit ${limit}.`
        });
        return steps;
      }
      if (current.depth >= limit) continue;
      for (const edge of [...adjacency[current.node]].reverse()) {
        if (current.path.includes(edge.node)) continue;
        frontier.push({
          node: edge.node,
          path: [...current.path, edge.node],
          cost: current.cost + edge.cost,
          depth: current.depth + 1
        });
      }
    }
  }
  return steps;
}

function pathEdges(path) {
  const set = new Set();
  for (let i = 0; i < path.length - 1; i++) {
    set.add([path[i], path[i + 1]].sort().join("-"));
  }
  return set;
}

function renderGraph() {
  const step = searchSteps[searchIndex] || {};
  const frontierNodes = new Set((step.frontier || []).map((item) => item.node));
  const exploredNodes = new Set(step.explored || []);
  const activePath = pathEdges(step.path || []);
  const svgEdges = graphEdges.map(([from, to, cost]) => {
    const a = graphNodes[from];
    const b = graphNodes[to];
    const key = [from, to].sort().join("-");
    const labelX = (a.x + b.x) / 2;
    const labelY = (a.y + b.y) / 2;
    return `
      <line class="edge-line ${activePath.has(key) ? "path" : ""}" x1="${a.x}%" y1="${a.y}%" x2="${b.x}%" y2="${b.y}%"></line>
      <text class="edge-label" x="${labelX}%" y="${labelY}%">${cost}</text>
    `;
  }).join("");

  const nodeHtml = Object.entries(graphNodes).map(([name, data]) => {
    const classes = ["graph-node"];
    if (name === "A") classes.push("start");
    if (name === "G") classes.push("goal");
    if (frontierNodes.has(name)) classes.push("frontier");
    if (exploredNodes.has(name)) classes.push("explored");
    if ((step.path || []).includes(name)) classes.push("path");
    if (step.current === name) classes.push("current");
    return `<div class="${classes.join(" ")}" style="left:${data.x}%;top:${data.y}%">${name}<small>h=${data.h}</small></div>`;
  }).join("");

  $("#graphArea").innerHTML = `<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${svgEdges}</svg>${nodeHtml}`;
}

function renderFrontierTable(step) {
  const rows = (step.frontier || []).map((item) => {
    const h = graphNodes[item.node].h;
    return `<tr><td>${item.node}</td><td>${item.cost}</td><td>${h}</td><td>${item.cost + h}</td><td>${item.path.join(" -> ")}</td></tr>`;
  }).join("");
  $("#frontierTable tbody").innerHTML = rows || `<tr><td colspan="5">Frontier is empty.</td></tr>`;
}

function renderSearch() {
  const step = searchSteps[searchIndex] || {};
  const info = algorithmInfo[searchAlgorithm];
  $("#algoTitle").textContent = info.title;
  $("#algoSummary").textContent = info.summary;
  $("#currentNode").textContent = step.current || "-";
  $("#frontierList").textContent = (step.frontier || []).map((item) => item.node).join(", ") || "-";
  $("#exploredList").textContent = (step.explored || []).join(", ") || "-";
  $("#pathList").textContent = (step.path || []).join(" -> ") || "-";
  $("#searchNarration").textContent = step.message || "Choose an algorithm and step through the graph.";
  $("#stepCounter").textContent = `Step ${searchIndex + 1} of ${searchSteps.length}`;
  renderFrontierTable(step);
  renderGraph();
}

function setAlgorithm(algo) {
  searchAlgorithm = algo;
  searchSteps = makeSearchSteps(algo);
  searchIndex = 0;
  $$(".algo-btn").forEach((button) => button.classList.toggle("active", button.dataset.algo === algo));
  stopSearch();
  renderSearch();
}

function stopSearch() {
  if (playTimer) {
    clearInterval(playTimer);
    playTimer = null;
  }
  $("#playSearch").textContent = "\u25b6";
}

function nextSearchStep() {
  searchIndex = Math.min(searchSteps.length - 1, searchIndex + 1);
  if (searchIndex === searchSteps.length - 1) stopSearch();
  renderSearch();
}

function prevSearchStep() {
  searchIndex = Math.max(0, searchIndex - 1);
  renderSearch();
}

$$(".algo-btn").forEach((button) => button.addEventListener("click", () => setAlgorithm(button.dataset.algo)));
$("#nextStep").addEventListener("click", nextSearchStep);
$("#prevStep").addEventListener("click", prevSearchStep);
$("#resetSearch").addEventListener("click", () => setAlgorithm(searchAlgorithm));
$("#playSearch").addEventListener("click", () => {
  if (playTimer) {
    stopSearch();
    return;
  }
  $("#playSearch").textContent = "||";
  playTimer = setInterval(nextSearchStep, 950);
});
setAlgorithm("bfs");

function renderConsistencyChecks() {
  const items = [];
  for (const [from, to, cost] of graphEdges) {
    const forward = graphNodes[from].h <= cost + graphNodes[to].h;
    const backward = graphNodes[to].h <= cost + graphNodes[from].h;
    items.push(`<div class="consistency-item"><span>${from} -> ${to}: ${graphNodes[from].h} <= ${cost} + ${graphNodes[to].h}</span><strong class="check-pass">${forward ? "passes" : "fails"}</strong></div>`);
    items.push(`<div class="consistency-item"><span>${to} -> ${from}: ${graphNodes[to].h} <= ${cost} + ${graphNodes[from].h}</span><strong class="check-pass">${backward ? "passes" : "fails"}</strong></div>`);
  }
  $("#consistencyList").innerHTML = items.join("");
}
renderConsistencyChecks();

const goalPuzzle = [1, 2, 3, 4, 5, 6, 7, 8, 0];
let puzzle = [2, 8, 3, 1, 6, 4, 7, 0, 5];
let puzzleG = 0;

function puzzleMoves(state) {
  const blank = state.indexOf(0);
  const row = Math.floor(blank / 3);
  const col = blank % 3;
  const moves = [];
  const deltas = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  for (const [dr, dc] of deltas) {
    const nr = row + dr;
    const nc = col + dc;
    if (nr < 0 || nr > 2 || nc < 0 || nc > 2) continue;
    moves.push(nr * 3 + nc);
  }
  return moves;
}

function movePuzzleTile(index, silent = false) {
  const blank = puzzle.indexOf(0);
  if (!puzzleMoves(puzzle).includes(index)) return false;
  [puzzle[blank], puzzle[index]] = [puzzle[index], puzzle[blank]];
  if (!silent) puzzleG += 1;
  renderPuzzle();
  return true;
}

function heuristicMisplaced(state) {
  return state.filter((tile, index) => tile !== 0 && tile !== goalPuzzle[index]).length;
}

function heuristicManhattan(state) {
  let total = 0;
  for (let index = 0; index < state.length; index++) {
    const tile = state[index];
    if (tile === 0) continue;
    const goalIndex = goalPuzzle.indexOf(tile);
    total += Math.abs(Math.floor(index / 3) - Math.floor(goalIndex / 3)) + Math.abs(index % 3 - goalIndex % 3);
  }
  return total;
}

function renderPuzzle() {
  $("#puzzleBoard").innerHTML = puzzle.map((tile, index) => {
    const classes = ["tile"];
    if (tile === 0) classes.push("blank");
    if (tile !== 0 && tile === goalPuzzle[index]) classes.push("in-place");
    return `<button class="${classes.join(" ")}" data-index="${index}" ${tile === 0 ? "aria-label=\"blank tile\"" : `aria-label="move tile ${tile}"`}>${tile || ""}</button>`;
  }).join("");
  $$("#puzzleBoard .tile").forEach((button) => {
    button.addEventListener("click", () => movePuzzleTile(Number(button.dataset.index)));
  });
  const h1 = heuristicMisplaced(puzzle);
  const h2 = heuristicManhattan(puzzle);
  $("#misplacedValue").textContent = h1;
  $("#manhattanValue").textContent = h2;
  $("#puzzleFValue").textContent = puzzleG + h2;
}

$("#scramblePuzzle").addEventListener("click", () => {
  puzzle = [...goalPuzzle];
  puzzleG = 0;
  let previousBlank = -1;
  for (let i = 0; i < 28; i++) {
    const moves = puzzleMoves(puzzle).filter((move) => move !== previousBlank);
    const choice = moves[Math.floor(Math.random() * moves.length)];
    previousBlank = puzzle.indexOf(0);
    const blank = puzzle.indexOf(0);
    [puzzle[blank], puzzle[choice]] = [puzzle[choice], puzzle[blank]];
  }
  renderPuzzle();
});

$("#hintPuzzle").addEventListener("click", () => {
  const moves = puzzleMoves(puzzle);
  const ranked = moves.map((move) => {
    const copy = [...puzzle];
    const blank = copy.indexOf(0);
    [copy[blank], copy[move]] = [copy[move], copy[blank]];
    return { move, h: heuristicManhattan(copy) };
  }).sort((a, b) => a.h - b.h);
  movePuzzleTile(ranked[0].move);
});
renderPuzzle();

let queenState = randomQueenState();
let beamStates = [];
let gaPopulation = Array.from({ length: 8 }, randomQueenState);
let generation = 0;

function randomQueenState() {
  return Array.from({ length: 8 }, () => Math.floor(Math.random() * 8));
}

function queenConflicts(state) {
  let conflicts = 0;
  for (let c1 = 0; c1 < 8; c1++) {
    for (let c2 = c1 + 1; c2 < 8; c2++) {
      const sameRow = state[c1] === state[c2];
      const sameDiag = Math.abs(state[c1] - state[c2]) === Math.abs(c1 - c2);
      if (sameRow || sameDiag) conflicts++;
    }
  }
  return conflicts;
}

function conflictQueens(state) {
  const marked = new Set();
  for (let c1 = 0; c1 < 8; c1++) {
    for (let c2 = c1 + 1; c2 < 8; c2++) {
      const sameRow = state[c1] === state[c2];
      const sameDiag = Math.abs(state[c1] - state[c2]) === Math.abs(c1 - c2);
      if (sameRow || sameDiag) {
        marked.add(`${state[c1]}-${c1}`);
        marked.add(`${state[c2]}-${c2}`);
      }
    }
  }
  return marked;
}

function queenNeighbors(state) {
  const neighbors = [];
  for (let col = 0; col < 8; col++) {
    for (let row = 0; row < 8; row++) {
      if (state[col] === row) continue;
      const next = [...state];
      next[col] = row;
      neighbors.push(next);
    }
  }
  return neighbors;
}

function renderQueenBoard() {
  const conflicts = conflictQueens(queenState);
  let html = "";
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const hasQueen = queenState[col] === row;
      const classes = ["queen-cell", (row + col) % 2 === 0 ? "light" : "dark"];
      if (hasQueen && conflicts.has(`${row}-${col}`)) classes.push("conflict");
      html += `<div class="${classes.join(" ")}">${hasQueen ? "Q" : ""}</div>`;
    }
  }
  $("#queenBoard").innerHTML = html;
  const conflictsCount = queenConflicts(queenState);
  $("#queenConflicts").textContent = conflictsCount;
  $("#queenFitness").textContent = 28 - conflictsCount;
}

function bestQueenStep() {
  const current = queenConflicts(queenState);
  const best = queenNeighbors(queenState)
    .map((state) => ({ state, conflicts: queenConflicts(state) }))
    .sort((a, b) => a.conflicts - b.conflicts);
  const bestConflicts = best[0].conflicts;
  if (bestConflicts < current) {
    const ties = best.filter((item) => item.conflicts === bestConflicts);
    queenState = ties[Math.floor(Math.random() * ties.length)].state;
    $("#queenExplain").textContent = `Moved to the best neighbor: conflicts dropped from ${current} to ${bestConflicts}.`;
  } else {
    $("#queenExplain").textContent = `No better neighbor exists from this state. This is a local optimum or plateau, so use restart, stochastic moves, or annealing.`;
  }
  renderQueenBoard();
}

function stochasticQueenStep() {
  const current = queenConflicts(queenState);
  const improving = queenNeighbors(queenState)
    .map((state) => ({ state, conflicts: queenConflicts(state) }))
    .filter((item) => item.conflicts < current);
  if (!improving.length) {
    $("#queenExplain").textContent = "No improving move found. Stochastic hill climbing still needs a better neighbor, so restart can help.";
    return;
  }
  const weights = improving.map((item) => current - item.conflicts + 1);
  let pick = Math.random() * weights.reduce((a, b) => a + b, 0);
  let choice = improving[0];
  for (let i = 0; i < improving.length; i++) {
    pick -= weights[i];
    if (pick <= 0) {
      choice = improving[i];
      break;
    }
  }
  queenState = choice.state;
  $("#queenExplain").textContent = `Stochastic move accepted an improving neighbor with ${choice.conflicts} conflicts.`;
  renderQueenBoard();
}

function annealQueenStep() {
  const temp = Number($("#temperatureRange").value);
  const current = queenConflicts(queenState);
  const neighbors = queenNeighbors(queenState);
  const candidate = neighbors[Math.floor(Math.random() * neighbors.length)];
  const next = queenConflicts(candidate);
  const delta = current - next;
  const accepted = delta > 0 || Math.random() < Math.exp(delta / temp);
  if (accepted) {
    queenState = candidate;
    $("#queenExplain").textContent = delta > 0
      ? `Annealing accepted a better move: ${current} -> ${next} conflicts.`
      : `Annealing accepted a worse move at T=${temp.toFixed(1)} to escape a local trap.`;
  } else {
    $("#queenExplain").textContent = `Annealing rejected a worse move at T=${temp.toFixed(1)}.`;
  }
  renderQueenBoard();
}

$("#restartQueens").addEventListener("click", () => {
  queenState = randomQueenState();
  $("#queenExplain").textContent = "Random restart creates a new hill to climb from.";
  renderQueenBoard();
});
$("#bestQueenStep").addEventListener("click", bestQueenStep);
$("#stochasticQueenStep").addEventListener("click", stochasticQueenStep);
$("#annealQueenStep").addEventListener("click", annealQueenStep);
$("#temperatureRange").addEventListener("input", () => {
  $("#temperatureValue").textContent = Number($("#temperatureRange").value).toFixed(1);
});
renderQueenBoard();

function renderStateStrip(state) {
  return `<div class="state-strip">${state.map((row) => `<i>${row + 1}</i>`).join("")}</div>`;
}

function resetBeams() {
  const k = Number($("#beamK").value);
  beamStates = Array.from({ length: k }, randomQueenState);
  renderBeams();
}

function renderBeams() {
  $("#beamList").innerHTML = beamStates.map((state, index) => {
    const conflicts = queenConflicts(state);
    return `<div class="beam-card"><div><strong>Beam ${index + 1}</strong>${renderStateStrip(state)}</div><span class="score-badge">${conflicts} conflicts</span></div>`;
  }).join("");
}

function beamStep() {
  const k = Number($("#beamK").value);
  const successors = beamStates.flatMap((state) => queenNeighbors(state));
  beamStates = successors
    .map((state) => ({ state, conflicts: queenConflicts(state) }))
    .sort((a, b) => a.conflicts - b.conflicts)
    .slice(0, k)
    .map((item) => item.state);
  renderBeams();
}

$("#beamK").addEventListener("input", resetBeams);
$("#beamReset").addEventListener("click", resetBeams);
$("#beamStep").addEventListener("click", beamStep);
resetBeams();

function renderGa() {
  const sorted = [...gaPopulation].sort((a, b) => queenConflicts(a) - queenConflicts(b));
  $("#gaPopulation").innerHTML = sorted.map((state, index) => {
    const fit = 28 - queenConflicts(state);
    return `<div class="ga-card"><div><strong>Gen ${generation}.${index + 1}</strong>${renderStateStrip(state)}</div><span class="score-badge">fit ${fit}</span></div>`;
  }).join("");
}

function crossover(a, b) {
  const cut = 1 + Math.floor(Math.random() * 6);
  const child = [...a.slice(0, cut), ...b.slice(cut)];
  if (Math.random() < 0.35) {
    const col = Math.floor(Math.random() * 8);
    child[col] = Math.floor(Math.random() * 8);
  }
  return child;
}

function gaStep() {
  const sorted = [...gaPopulation].sort((a, b) => queenConflicts(a) - queenConflicts(b));
  const parents = sorted.slice(0, 4);
  const next = sorted.slice(0, 2);
  while (next.length < 8) {
    const p1 = parents[Math.floor(Math.random() * parents.length)];
    const p2 = parents[Math.floor(Math.random() * parents.length)];
    next.push(crossover(p1, p2));
  }
  gaPopulation = next;
  generation++;
  renderGa();
}

$("#gaStep").addEventListener("click", gaStep);
renderGa();

let pheromoneA = 1;
let pheromoneB = 1;

function renderAco(bestRoute = "-") {
  const canvas = $("#acoCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const nodes = {
    S: [70, 140],
    A: [240, 70],
    B: [240, 210],
    G: [450, 140]
  };

  function edge(from, to, pheromone, cost, color) {
    const [x1, y1] = nodes[from];
    const [x2, y2] = nodes[to];
    ctx.lineWidth = 4 + pheromone * 3;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.fillStyle = "#42505f";
    ctx.font = "700 14px system-ui";
    ctx.fillText(`cost ${cost}`, (x1 + x2) / 2 - 22, (y1 + y2) / 2 - 8);
  }

  edge("S", "A", pheromoneA, 3, "rgba(0,124,137,0.55)");
  edge("A", "G", pheromoneA, 3, "rgba(0,124,137,0.55)");
  edge("S", "B", pheromoneB, 5, "rgba(214,90,58,0.45)");
  edge("B", "G", pheromoneB, 5, "rgba(214,90,58,0.45)");

  for (const [name, [x, y]] of Object.entries(nodes)) {
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#17202a";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#17202a";
    ctx.font = "900 18px system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(name, x, y);
  }
  ctx.textAlign = "start";
  ctx.textBaseline = "alphabetic";
  $("#acoBestRoute").textContent = bestRoute;
  $("#pheromoneA").textContent = pheromoneA.toFixed(2);
  $("#pheromoneB").textContent = pheromoneB.toFixed(2);
}

function acoStep() {
  let routeA = 0;
  let routeB = 0;
  for (let ant = 0; ant < 12; ant++) {
    const attractivenessA = pheromoneA * (1 / 6);
    const attractivenessB = pheromoneB * (1 / 10);
    const probabilityA = attractivenessA / (attractivenessA + attractivenessB);
    if (Math.random() < probabilityA) routeA++;
    else routeB++;
  }
  pheromoneA = pheromoneA * 0.75 + routeA * (1 / 6);
  pheromoneB = pheromoneB * 0.75 + routeB * (1 / 10);
  const bestRoute = pheromoneA >= pheromoneB ? "S-A-G" : "S-B-G";
  renderAco(bestRoute);
}

$("#acoStep").addEventListener("click", acoStep);
renderAco();
